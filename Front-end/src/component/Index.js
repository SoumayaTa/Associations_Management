import React from 'react';
import Login from './Login';

function Index() {
      const containerStyle = {
            backgroundColor: '#edf6f9', 
            display: 'flex', 
            flexDirection: 'column', 
            minHeight: '100vh',
          };
  return (
    <div   style={containerStyle}>
     
        <Login/>

      
    </div>
  );
}

export default Index;
