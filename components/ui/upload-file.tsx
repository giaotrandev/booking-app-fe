'use client';

import { Notification } from '#/components/ui/notification';
import { Icon } from '../icons';
import { Typography } from './typography';
import { Button } from './button';
import { UserAvatar } from './user-avatar';
import { useUserStore } from '#/store/user';
import { useRef, useState, useEffect } from 'react';
import { ButtonIcon } from './button-icon';
import { cn } from '#/lib/utilities/cn';

interface UploadFileProps {
  isOpen: boolean;
  onClose: () => void;
  onFileSelect: (files: File[] | File | null) => void;
  accept?: string;
  currentPreview?: string;
  fieldName?: string;
  isAvatar?: boolean;
  multiple?: boolean;
}

const UploadFile = ({
  isOpen,
  onClose,
  onFileSelect,
  accept,
  currentPreview,
  fieldName = 'avatar',
  isAvatar = false,
  multiple = false,
}: UploadFileProps) => {
  const { user } = useUserStore();
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [dragOver, setDragOver] = useState<boolean>(false);
  const [showConfirmExit, setShowConfirmExit] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const hasNewFiles = selectedFiles.length > 0;

  const requestClose = () => {
    if (hasNewFiles && isOpen) {
      setShowConfirmExit(true);
    } else {
      handleCancel();
    }
  };

  // Initialize preview when modal opens
  useEffect(() => {
    if (isOpen) {
      // setPreviewImages(currentPreview ? [currentPreview] : []);
      // Sử dụng previewAvatar từ store làm ưu tiên, nếu không có thì dùng currentPreview
      setPreviewImages(
        user?.previewAvatar
          ? [user.previewAvatar]
          : currentPreview
            ? [currentPreview]
            : [],
      );
      setSelectedFiles([]);
      setShowConfirmExit(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }, [isOpen, currentPreview]);

  // Handle ESC key press - override Modal's default ESC handling
  useEffect(() => {
    const handleEscPress = (event: KeyboardEvent) => {
      if ((event.key === 'Escape' || event.key === 'Esc') && isOpen) {
        if (showConfirmExit) {
          event.preventDefault();
          event.stopPropagation();
          event.stopImmediatePropagation();
          setShowConfirmExit(false);
          return;
        }
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        requestClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscPress, { capture: true });
      return () => {
        document.removeEventListener('keydown', handleEscPress, {
          capture: true,
        });
      };
    }
  }, [isOpen, hasNewFiles, showConfirmExit]);

  const handleFileChange = (files: FileList) => {
    const fileArray = Array.from(files);
    if (fileArray.length === 0) return;

    // Validate file types
    if (accept) {
      const regex = new RegExp(accept.replace(/\*/g, '.*'));
      if (!fileArray.every(file => file.type.match(regex))) {
        // Optionally show an error notification here
        return;
      }
    }

    setSelectedFiles(fileArray);
    const newPreviews = fileArray
      .filter(file => file.type.startsWith('image/'))
      .map(file => URL.createObjectURL(file));
    setPreviewImages(newPreviews.length > 0 ? newPreviews : []);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      handleFileChange(files);
    }
  };

  const handleConfirm = () => {
    if (multiple) {
      onFileSelect(selectedFiles.length > 0 ? selectedFiles : null);
    } else {
      onFileSelect(selectedFiles.length > 0 ? selectedFiles[0] : null);
    }
    // Clean up preview URLs
    previewImages.forEach(url => {
      if (url.startsWith('blob:') && url !== currentPreview) {
        URL.revokeObjectURL(url);
      }
    });
    onClose();
  };

  // const handleCancel = () => {
  //   previewImages.forEach(url => {
  //     if (url.startsWith('blob:') && url !== currentPreview) {
  //       URL.revokeObjectURL(url);
  //     }
  //   });
  //   setPreviewImages([]);
  //   setSelectedFiles([]);
  //   setShowConfirmExit(false);
  //   onClose();
  // };

  // const handleConfirmDiscard = () => {
  //   handleCancel();
  // };
  const handleCancel = () => {
    // Chỉ revoke các blob URLs mới được tạo, không phải currentPreview
    previewImages.forEach(url => {
      if (url.startsWith('blob:') && url !== currentPreview) {
        URL.revokeObjectURL(url);
      }
    });

    // Reset về trạng thái ban đầu với currentPreview
    setPreviewImages(currentPreview ? [currentPreview] : []);
    setSelectedFiles([]);
    setShowConfirmExit(false);

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    onClose();
  };

  const handleConfirmDiscard = () => {
    // Chỉ revoke các blob URLs mới được tạo, không phải currentPreview
    previewImages.forEach(url => {
      if (url.startsWith('blob:') && url !== currentPreview) {
        URL.revokeObjectURL(url);
      }
    });

    // Reset về trạng thái ban đầu với currentPreview
    setPreviewImages(currentPreview ? [currentPreview] : []);
    setSelectedFiles([]);
    setShowConfirmExit(false);

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    onClose();
  };

  const handleCancelDiscard = () => {
    setShowConfirmExit(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setDragOver(false);

    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileChange(files);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setDragOver(false);
  };

  // const displayPreview =
  //   previewImages.length > 0 ? previewImages[0] : currentPreview;
  const displayPreview =
    previewImages.length > 0 ? previewImages[0] : currentPreview || null;

  return (
    <>
      {/* Main Upload Modal */}
      <Notification
        open={isOpen}
        onClose={requestClose}
        clickOutsideToClose={!showConfirmExit}
        className="max-w-lg"
      >
        <>
          <div className="pointer-events-auto relative flex flex-col items-center gap-4 rounded-xl bg-white p-4 lg:p-6">
            <div className="absolute top-3 right-3 lg:top-4 lg:right-4">
              <ButtonIcon
                onClick={requestClose}
                size="sm"
                icon={{ name: 'x-mark' }}
              />
            </div>
            <Typography variant="h3" className="text-center" asChild>
              <p>{isAvatar ? 'Choose Profile Picture' : 'Upload File'}</p>
            </Typography>

            {/* Preview Section */}
            <div className="relative">
              {isAvatar ? (
                <UserAvatar
                  // urlAvatar={displayPreview}
                  urlAvatar={displayPreview || undefined}
                  userName={
                    user?.name
                      ?.split(' ')
                      .map(word => word[0]?.toUpperCase())
                      .join('') || 'User'
                  }
                  width={128}
                  height={128}
                  avatarClassName="size-32"
                  titleFallBack="h3"
                />
              ) : (
                // Non-avatar file preview
                <div className="flex h-30 w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
                  {selectedFiles.length > 0 ? (
                    <div className="text-center">
                      <Icon
                        name="upload"
                        className="mx-auto h-8 w-8 text-gray-400"
                      />
                      <p className="mt-2 text-sm text-gray-600">
                        {selectedFiles.map(file => file.name).join(', ')}
                      </p>
                    </div>
                  ) : (
                    <div className="text-center text-gray-400">
                      <Icon name="upload" className="mx-auto h-8 w-8" />
                      <p className="mt-2 text-sm">No file selected</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Drop Zone */}
            <div
              className={cn(
                'group w-full cursor-pointer rounded-lg border-2 border-dashed p-6 text-center transition-colors',
                'hover:border-pj-red focus-visible:border-pj-red',
                dragOver
                  ? 'border-pj-red'
                  : 'border-pj-grey-lightest hover:border-pj-grey-lightest',
              )}
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              role="button"
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  fileInputRef.current?.click();
                }
              }}
            >
              <span
                className={cn(
                  'group-hocus-visible:text-pj-red group-hocus-visible:fill-pj-red group-focus-visible:text-pj-red flex cursor-pointer flex-col transition-colors',
                )}
              >
                <Typography
                  asChild
                  className={cn('font-sans', dragOver && 'text-pj-red')}
                  variant="small-label"
                >
                  <span>
                    <Icon
                      name="upload"
                      className={cn(
                        'mx-auto h-8 w-8',
                        dragOver && 'fill-pj-red',
                      )}
                    />
                    Upload file{multiple ? '(s)' : ''} here
                  </span>
                </Typography>
                <Typography
                  asChild
                  variant="sub-body"
                  className={cn(
                    'text-pj-input group-hover:text-pj-red group-focus-visible:text-pj-red transition-colors',
                    dragOver && 'text-pj-red',
                  )}
                >
                  <span>or drag and drop here</span>
                </Typography>
              </span>
            </div>

            {/* File Input */}
            <input
              ref={fileInputRef}
              type="file"
              accept={accept}
              multiple={multiple}
              onChange={handleInputChange}
              className="hidden"
            />

            {/* File Type Info */}
            <Typography
              className="text-pj-input text-center"
              asChild
              variant="sub-body"
            >
              <p>
                {isAvatar
                  ? `( JPG, PNG up to 5MB )${multiple ? ', multiple files allowed' : ''}`
                  : `Select ${multiple ? 'files' : 'a file'} to upload`}
              </p>
            </Typography>

            {/* Action Buttons */}
            <div className="flex w-full flex-col gap-3 lg:flex-row">
              <div className="w-full lg:w-1/2">
                <Button
                  type="button"
                  onClick={requestClose}
                  text="Cancel"
                  className="w-full"
                />
              </div>
              <div className="w-full lg:w-1/2">
                <Button
                  type="button"
                  onClick={handleConfirm}
                  text="Save Changes"
                  disabled={!hasNewFiles}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </>
      </Notification>
      {/* Overlay Confirmation Dialog */}
      {showConfirmExit && (
        <div
          className="fixed inset-0 z-1097 flex items-center justify-center rounded-xl bg-black/20 backdrop-blur-xs"
          onClick={handleCancelDiscard}
        >
          <div
            className="relative w-[320px] rounded-xl bg-white p-6 shadow-xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="absolute top-4 right-4">
              <ButtonIcon
                onClick={handleCancelDiscard}
                size="sm"
                icon={{ name: 'x-mark' }}
              />
            </div>
            <div className="mb-4 flex items-center justify-between">
              <Typography variant="h4" className="flex-1 text-center">
                Discard Changes
              </Typography>
            </div>
            <Typography
              variant="sub-body"
              className="mb-6 text-center text-gray-600"
            >
              Are you sure you want to discard the changes?
            </Typography>
            <div className="flex w-full gap-3">
              <div className="w-1/2">
                <Button
                  type="button"
                  onClick={handleCancelDiscard}
                  text="Cancel"
                  className="w-full"
                />
              </div>
              <div className="w-1/2">
                <Button
                  type="button"
                  onClick={handleConfirmDiscard}
                  text="Discard"
                  disabled={!hasNewFiles}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export { UploadFile };
