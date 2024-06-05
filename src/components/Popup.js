import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const Popup = ({ dataset, onClose }) => {
  const handleCopyClick = (text) => {
    navigator.clipboard.writeText(text).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };

  const codeInstall = `pip install pbdldataset`;
  const codeStarter = `from pbdldataset.dataset import PBDLDataset
from pbdldataset.dataloader import PBDLDataLoader

dataset = PBDLDataset(
    '${dataset.key}',
    time_steps=10,
    normalize=True
)

loader = PBDLDataLoader(dataset, batch_size=3, shuffle=True)`;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{dataset.key}</h2>
        <p>Channels: {dataset.field_desc.join(', ')}<br />
        Constants: {dataset.constant_desc.join(', ')}</p>
        <h3>Installation</h3>
        <p>To install this dataset follow these steps:</p>
        <ol>
          <li>Install the python package
            <div className="code-container">
            <SyntaxHighlighter language="plain" style={vscDarkPlus} customStyle={{ background: '#2d2d2d', borderRadius: '4px', padding: '25px'}} codeTagProps={{ style: { fontSize: '14pt' } }}>
                {codeInstall}
              </SyntaxHighlighter>
              <button className="copy-button" onClick={() => handleCopyClick(codeInstall)}>Copy</button>
            </div>
          </li>
          <li>Copy this starter code
            <div className="code-container">
            <SyntaxHighlighter language="python" style={vscDarkPlus} customStyle={{ background: '#2d2d2d', borderRadius: '4px', padding: '25px'}} codeTagProps={{ style: { fontSize: '14pt' } }}>
                {codeStarter}
              </SyntaxHighlighter>
              <button className="copy-button" onClick={() => handleCopyClick(codeStarter)}>Copy</button>
            </div>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default Popup;
