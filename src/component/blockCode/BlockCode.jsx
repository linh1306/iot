import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const BlockCode = ({ codeString, language ,path}) => {
  return (
    <div className='rounded-lg overflow-hidden'>
      <div className='w-full h-7 bg-slate-800 text-white pl-3 flex items-center'><p>{path}</p></div>
      <SyntaxHighlighter language={language} style={vs2015}>
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
};

export default BlockCode;