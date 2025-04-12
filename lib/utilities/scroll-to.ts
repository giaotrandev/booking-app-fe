const scrollTo = ({
    id,
    options,
  }: {
    id: string;
    options?: ScrollIntoViewOptions;
  }): void => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView(options);
    }
  };
  
  export { scrollTo };
  