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
import { useTranslate } from '#/i18n/client';

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
  const { translate } = useTranslate();
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

  useEffect(() => {
    if (isOpen) {
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
    if (accept) {
      const regex = new RegExp(accept.replace(/\*/g, '.*'));
      if (!fileArray.every(file => file.type.match(regex))) {
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
    if (files) handleFileChange(files);
  };

  const handleConfirm = () => {
    if (multiple) {
      onFileSelect(selectedFiles.length > 0 ? selectedFiles : null);
    } else {
      onFileSelect(selectedFiles.length > 0 ? selectedFiles[0] : null);
    }
    previewImages.forEach(url => {
      if (url.startsWith('blob:') && url !== currentPreview) {
        URL.revokeObjectURL(url);
      }
    });
    onClose();
  };

  const handleCancel = () => {
    previewImages.forEach(url => {
      if (url.startsWith('blob:') && url !== currentPreview) {
        URL.revokeObjectURL(url);
      }
    });
    setPreviewImages(currentPreview ? [currentPreview] : []);
    setSelectedFiles([]);
    setShowConfirmExit(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onClose();
  };

  const handleConfirmDiscard = handleCancel;
  const handleCancelDiscard = () => setShowConfirmExit(false);

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setDragOver(false);
    const files = event.dataTransfer.files;
    if (files && files.length > 0) handleFileChange(files);
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

  const displayPreview =
    previewImages.length > 0 ? previewImages[0] : currentPreview || null;

  return (
    <>
      <Notification
        open={isOpen}
        onClose={requestClose}
        clickOutsideToClose={!showConfirmExit}
        className="max-w-lg"
      >
        <div className="pointer-events-auto relative flex flex-col items-center gap-4 rounded-xl bg-white p-4 lg:p-6">
          <div className="absolute top-3 right-3 lg:top-4 lg:right-4">
            <ButtonIcon
              onClick={requestClose}
              size="sm"
              icon={{ name: 'x-mark' }}
            />
          </div>
          <Typography variant="h3" className="text-center" asChild>
            <p>
              {isAvatar
                ? translate({
                    vi: 'Chọn ảnh đại diện',
                    en: 'Choose Profile Picture',
                  })
                : translate({
                    vi: 'Tải tệp lên',
                    en: 'Upload File',
                  })}
            </p>
          </Typography>

          <div className="relative">
            {isAvatar ? (
              <UserAvatar
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
                    <p className="mt-2 text-sm">
                      {translate({
                        vi: 'Chưa chọn tệp nào',
                        en: 'No file selected',
                      })}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div
            className={cn(
              'group w-full cursor-pointer rounded-lg border-2 border-dashed p-6 text-center transition-colors',
              'hover:border-pj-red focus-visible:border-pj-red',
              dragOver
                ? 'border-pj-red'
                : 'border-pj-gray-lightest hover:border-pj-gray-lightest',
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
                className={cn(dragOver && 'text-pj-red')}
                variant="small-label"
              >
                <span>
                  <Icon
                    name="upload"
                    className={cn('mx-auto h-8 w-8', dragOver && 'fill-pj-red')}
                  />
                  {translate({
                    vi: `Tải tệp${multiple ? '(s)' : ''} lên tại đây`,
                    en: `Upload file${multiple ? '(s)' : ''} here`,
                  })}
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
                <span>
                  {translate({
                    vi: 'hoặc kéo và thả vào đây',
                    en: 'or drag and drop here',
                  })}
                </span>
              </Typography>
            </span>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            multiple={multiple}
            onChange={handleInputChange}
            className="hidden"
          />

          <Typography
            className="text-pj-input text-center"
            asChild
            variant="sub-body"
          >
            <p>
              {isAvatar
                ? translate({
                    vi: `( JPG, PNG dung lượng tối đa 5MB )${multiple ? ', cho phép nhiều tệp' : ''}`,
                    en: `( JPG, PNG up to 5MB )${multiple ? ', multiple files allowed' : ''}`,
                  })
                : translate({
                    vi: `Chọn ${multiple ? 'các tệp' : 'một tệp'} để tải lên`,
                    en: `Select ${multiple ? 'files' : 'a file'} to upload`,
                  })}
            </p>
          </Typography>

          <div className="flex w-full flex-col gap-3 lg:flex-row">
            <div className="w-full lg:w-1/2">
              <Button
                type="button"
                onClick={requestClose}
                text={translate({
                  vi: 'Hủy',
                  en: 'Cancel',
                })}
                className="w-full"
              />
            </div>
            <div className="w-full lg:w-1/2">
              <Button
                type="button"
                onClick={handleConfirm}
                text={translate({
                  vi: 'Lưu thay đổi',
                  en: 'Save Changes',
                })}
                disabled={!hasNewFiles}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </Notification>

      {showConfirmExit && (
        <div
          className="fixed inset-0 z-[2001] flex items-center justify-center rounded-xl bg-black/20 backdrop-blur-xs"
          onClick={handleCancelDiscard}
        >
          <div
            className="relative w-80 rounded-xl bg-white p-6 shadow-xl"
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
                {translate({
                  vi: 'Hủy thay đổi',
                  en: 'Discard Changes',
                })}
              </Typography>
            </div>
            <Typography
              variant="sub-body"
              className="mb-6 text-center text-gray-600"
            >
              {translate({
                vi: 'Bạn có chắc muốn hủy các thay đổi này không?',
                en: 'Are you sure you want to discard the changes?',
              })}
            </Typography>
            <div className="flex w-full gap-3">
              <div className="w-1/2">
                <Button
                  type="button"
                  onClick={handleCancelDiscard}
                  text={translate({
                    vi: 'Hủy',
                    en: 'Cancel',
                  })}
                  className="w-full"
                />
              </div>
              <div className="w-1/2">
                <Button
                  type="button"
                  onClick={handleConfirmDiscard}
                  text={translate({
                    vi: 'Hủy bỏ',
                    en: 'Discard',
                  })}
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
