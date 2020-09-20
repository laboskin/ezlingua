import React from 'react';

function MainContainer({maxWidth, ...props}) {
    const style = {
        maxWidth: maxWidth || '100%',
        padding: '20px 10px',
        backgroundColor: '#fff',
        margin: '0 auto'
    };
    return (
        <div style={style} {...props}>
            {props.children}
        </div>
    )
}

export default MainContainer;
