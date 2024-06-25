import React from 'react';
import { Box } from '@kuma-ui/core';


const Loader: React.FC = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100%"
    >
      <Box
        width="40px"
        height="40px"
        border="5px solid rgba(0, 0, 0, 0.1)"
        borderTop="5px solid #3498db"
        borderRadius="50%"
        animation="spin 1s linear infinite"
      />
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </Box>
  );
};

export default Loader;
