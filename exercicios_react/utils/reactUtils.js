import React from 'react';

function childrenWithProps(children, props) {
   return React.Children.map(children, 
        c => React.cloneElement(c, {...props}))
}

export { childrenWithProps };