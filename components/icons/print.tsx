import { cn } from '#/lib/utilities/cn';
import { SvgProps } from '#/types/global';

const Print = ({ ...props }: SvgProps) => {
  return (
    <svg
      className={cn('h-6 w-6 stroke-black', props.className)}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 34 34"
      fill="none"
    >
      <g>
        <path
          d="M6.48486 20.3018H27.3067C27.9203 20.3018 28.5087 20.5456 28.9426 20.9795C29.3765 21.4133 29.6202 22.0018 29.6202 22.6154V31.8695H4.17133V22.6154C4.17133 22.0018 4.41507 21.4133 4.84894 20.9795C5.28282 20.5456 5.87127 20.3018 6.48486 20.3018V20.3018Z"
          //   stroke="#000001"
          strokeWidth="2.31353"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4.17132 22.6154C3.55774 22.6154 2.96928 22.3716 2.53541 21.9378C2.10153 21.5039 1.85779 20.9154 1.85779 20.3018V15.6748C1.85779 15.0612 2.10153 14.4727 2.53541 14.0389C2.96928 13.605 3.55774 13.3612 4.17132 13.3612H29.6202C30.2338 13.3612 30.8223 13.605 31.2561 14.0389C31.69 14.4727 31.9337 15.0612 31.9337 15.6748V20.3018C31.9337 20.9154 31.69 21.5039 31.2561 21.9378C30.8223 22.3716 30.2338 22.6154 29.6202 22.6154"
          //   stroke="#000001"
          strokeWidth="2.31353"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M26.1499 1.79357H7.6416V13.3612H26.1499V1.79357Z"
          //   stroke="#000001"
          strokeWidth="2.31353"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.95514 26.0857H23.8363"
          //   stroke="#000001"
          strokeWidth="2.31353"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

export default Print;
