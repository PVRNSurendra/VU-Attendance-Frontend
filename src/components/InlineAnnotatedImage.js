import React, { useRef, useEffect, useState } from 'react';
import './InlineAnnotatedImage.css';

const InlineAnnotatedImage = ({ imageData, recognitionData }) => {
  const canvasRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (!imageData || !recognitionData) return;

    const img = new Image();
    img.onload = () => {
      setImageLoaded(true);
      drawAnnotatedImage(img);
    };
    img.onerror = () => {
      console.error('Failed to load image');
    };
    img.src = imageData;
  }, [imageData, recognitionData]);

  const drawAnnotatedImage = (img) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Set canvas size to match image
    canvas.width = img.width;
    canvas.height = img.height;

    // Draw the original image
    ctx.drawImage(img, 0, 0);

    // Draw bounding boxes and labels for each recognized student
    if (recognitionData && recognitionData.recognized_students) {
      recognitionData.recognized_students.forEach((student) => {
        if (student.bbox) {
          drawFaceAnnotation(ctx, student);
        }
      });
    }
  };

  const drawFaceAnnotation = (ctx, student) => {
    const { bbox, student_id, confidence } = student;
    const [x, y, width, height] = bbox;

    // Determine color based on confidence
    let color;
    if (confidence >= 0.8) {
      color = '#4CAF50'; // Green - High confidence
    } else if (confidence >= 0.7) {
      color = '#FF9800'; // Orange - Medium confidence
    } else {
      color = '#F44336'; // Red - Low confidence
    }

    // Draw rectangle around face
    ctx.strokeStyle = color;
    ctx.lineWidth = 4;
    ctx.strokeRect(x, y, width, height);

    // Prepare label text
    const label = `${student_id}`;
    const confidenceText = `${(confidence * 100).toFixed(0)}%`;

    // Configure text style
    ctx.font = 'bold 18px Arial';
    
    // Measure text width for background
    const labelWidth = ctx.measureText(label).width;
    const confWidth = ctx.measureText(confidenceText).width;
    const maxWidth = Math.max(labelWidth, confWidth);
    const padding = 10;
    const labelHeight = 22;
    const totalHeight = labelHeight * 2 + padding * 3;

    // Draw background rectangle for label (above the face box)
    ctx.fillStyle = color;
    ctx.fillRect(x, y - totalHeight, maxWidth + padding * 2, totalHeight);

    // Draw student ID
    ctx.fillStyle = 'white';
    ctx.textAlign = 'left';
    ctx.fillText(label, x + padding, y - totalHeight + labelHeight);

    // Draw confidence score
    ctx.font = 'bold 14px Arial';
    ctx.fillText(confidenceText, x + padding, y - totalHeight + labelHeight + 20);
  };

  const downloadAnnotatedImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `annotated_attendance_${Date.now()}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 'image/jpeg', 0.95);
  };

  if (!imageData || !recognitionData) return null;

  return (
    <div className="inline-annotated-section">
      <div className="annotated-header">
        <h3>📊 Recognition Results</h3>
        <div className="annotated-stats">
          <span className="stat-badge detected">
            {recognitionData.faces_detected || 0} Detected
          </span>
          <span className="stat-badge recognized">
            {recognitionData.recognized_students?.length || 0} Recognized
          </span>
          {recognitionData.unrecognized_faces > 0 && (
            <span className="stat-badge unrecognized">
              {recognitionData.unrecognized_faces} Unrecognized
            </span>
          )}
        </div>
      </div>

      {!imageLoaded && (
        <div className="inline-loading">
          <div className="inline-spinner"></div>
          <p>Processing image...</p>
        </div>
      )}

      <div className="annotated-image-container">
        <canvas
          ref={canvasRef}
          className="inline-annotated-canvas"
          style={{ display: imageLoaded ? 'block' : 'none' }}
        />
      </div>

      {imageLoaded && (
        <div className="annotated-footer">
          <div className="legend-inline">
            <strong>Legend:</strong>
            <div className="legend-items-inline">
              <span className="legend-dot high"></span>
              <span>High (≥80%)</span>
              <span className="legend-dot medium"></span>
              <span>Medium (70-80%)</span>
              <span className="legend-dot low"></span>
              <span>Low (&lt;70%)</span>
            </div>
          </div>
          <button className="download-btn-inline" onClick={downloadAnnotatedImage}>
            📥 Download Image
          </button>
        </div>
      )}
    </div>
  );
};

export default InlineAnnotatedImage;