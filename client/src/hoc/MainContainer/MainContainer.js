import React from 'react';

function MainContainer(props) {
    const style = {
        maxWidth: props.maxWidth || '100%',
        padding: '20px 10px',
        backgroundColor: '#fff',
        margin: '0 auto'
    }
    return (
        <div className="wrapper" style={style}>
            {props.children}
        </div>
    )
}

export default MainContainer;
