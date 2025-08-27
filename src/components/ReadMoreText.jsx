import { useState } from 'react';

const ReadMoreText = ({ text, maxLength = 150 }) => {
  const [isTruncated, setIsTruncated] = useState(true);

  if (!text) return null;

  const shouldTruncate = text.length > maxLength;
  const displayText = isTruncated && shouldTruncate 
    ? `${text.substring(0, maxLength)}...` 
    : text;

  return (
    <div className="text-gray-300  leading-relaxed">
      <p className="">{displayText}</p>
      {shouldTruncate && (
        <button
          onClick={() => setIsTruncated(!isTruncated)}
          className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors"
        >
          {isTruncated ? 'Read More' : 'Show Less'}
        </button>
      )}
    </div>
  );
};

export default ReadMoreText;
