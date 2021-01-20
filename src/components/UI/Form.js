import React from 'react';

const Form = ({handleFileUpload , upload ,isFileSelectted}) => {
    return (
        <div>
                <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                />
                
                <button onClick={upload} disabled={!isFileSelectted ?true : false}>upload</button> 
        </div>
    )
}

export default Form
