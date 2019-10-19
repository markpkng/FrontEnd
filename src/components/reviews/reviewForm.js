import React from 'react';
import styled from 'styled-components';

const FlexColumn = styled.div `
    display: flex;
    flex-direction: column;
    width: 500px;
    margin: 0 auto;
`

const ReviewForm = () => {
    return (
        <div>
            <form>
                <FlexColumn>
                    <h2>Write A Review:</h2>
                    <label>Stars: <select>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select></label>
                    <input type='text' placeholder='Comment'/>
                    <label>Post as anonymous? <input type='checkbox'/></label>
                    <button type='submit'>Submit</button>
                </FlexColumn>
            </form>
        </div>  
    );
}

export default ReviewForm;