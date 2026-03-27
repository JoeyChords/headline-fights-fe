import React from "react";

type MockImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  fill?: boolean;
  priority?: boolean;
};

const MockImage = ({ src, alt, fill: _fill, priority: _priority, ...props }: MockImageProps) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img src={src as string} alt={alt ?? ""} {...props} />
);

export default MockImage;
