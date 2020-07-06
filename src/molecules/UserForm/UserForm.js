import React, { useState, useEffect } from 'react';
import { Row, Col, Block } from 'jsxstyle';
import './UserForm.scss';


/**
* Form with Candidate related information
*/
function UserForm(props) {

    const [name, setName] = useState('')
    const [docId, setDocId] = useState('')
    const [email, setEmail] = useState('')
    const [birthDate, setBirthDate] = useState(null)
    const [userName, setUserName] = useState('')

    function handleSubmit(e) {
        e.preventDefault();
        document.cookie = 'user=' + JSON.stringify({ name, docId, birthDate, email, userName });
        props.showMessage();
    }

    return (

        <form onSubmit={handleSubmit} className='userForm'>
            <Col container spacing={4}>
                <Block>
                    <h1 className='form__header'>Candidate Registration</h1>
                </Block>
                <Block>
                    <label>Full Name</label>

                    <input type="text"
                        required
                        
                        name='name'
                        placeholder='Full Name'
                        onChange={e => setName(e.target.value)} />
                </Block>
                <Block>
                    <label>Document ID</label>

                    <input type="text"
                        
                        name='docId'
                        placeholder='Document ID'
                        onChange={e => setDocId(e.target.value)} />
                </Block>
                <Block>
                    <label>Github Username</label>

                    <input type="text"
                        required
                        
                        name='userName'
                        placeholder='Github Username'
                        onChange={e => setDocId(e.target.value)} />
                </Block>
                <Block>
                    <label>Date of birth</label>
                    <input
                        type='date'
                        placeholder='Date of birth'
                        onChange={e => setBirthDate(e.target.value)}
                    />

                </Block>
                <Block>
                <label>Email</label>
                    <input type="text"
                        required
                        
                        name='email'
                        placeholder='E-mail'
                        onChange={e => setEmail(e.target.value)} />
                </Block>
                <Block padding="2rem 0">
                    <input type="submit" value="Save Candidate Info" />
                </Block>
            </Col>
        </form>
    );

}

export default UserForm;