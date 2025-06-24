export interface ButtonContentProps {
  text: string;
}
const ButtonContent = ({ text }: ButtonContentProps) => {
  return (
    <span className="relative flex items-center overflow-hidden">
      <span className="group-hocus-visible/button:-translate-y-full inline-block transition-transform duration-500 ease-[cubic-bezier(.4,0,0,1)]">
        {text}
      </span>
      <span className="group-hocus-visible/button:translate-y-0 absolute inset-0 flex translate-y-full items-center justify-center transition-transform duration-500 ease-[cubic-bezier(.4,0,0,1)]">
        {text}
      </span>
    </span>
  );
};
export { ButtonContent };
