// import { listeners } from 'process';
// import React, { useState, useRef, useEffect, MouseEvent } from 'react';

// type Position = {
//   top: number;
//   left: number;
// };

// export default function TranslationPopup() {
//   const [selectedText, setSelectedText] = useState<string>('');
//   const [popupPosition, setPopupPosition] = useState<Position>({
//     top: 0,
//     left: 0,
//   });
//   const iframeRef = useRef<HTMLIFrameElement | null>(null);

//   const handleClickOutside = (event: Event) => {
//     if (
//       iframeRef.current &&
//       !iframeRef.current.contains(event.target as Node)
//     ) {
//       setSelectedText('');
//     }
//   };

//   useEffect(() => {
//     document.addEventListener('mousedown', (e) => {
//       handleClickOutside(e);
//     });

//     return () => {
//       document.removeEventListener('mousedown', (e) => handleClickOutside(e));
//     };
//   }, []);

//   return (
//     <div>
//       <p>Выделите любое слово, чтобы увидеть перевод.</p>

//       {selectedText && (
//         <iframe
//           ref={iframeRef}
//           title='Google Translate'
//           src={`https://translate.google.com/?sl=auto&tl=ru&text=${encodeURIComponent(
//             selectedText
//           )}&op=translate`}
//           style={{
//             position: 'absolute',
//             top: popupPosition.top + 10, // немного ниже курсора
//             left: popupPosition.left + 10, // немного правее курсора
//             width: '300px',
//             height: '150px',
//             border: '1px solid #ccc',
//             boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
//             zIndex: 1000,
//           }}></iframe>
//       )}
//     </div>
//   );
// }
