import React from 'react';
import { Form, Button } from 'react-bootstrap';
const FormUserInput = () => {
    const formHandler = (event) => {
        event.preventDefault();
        const title = event.target.title.value;
        const openingText = event.target.openingtext.value;
        const date = event.target.date.value;
        const NewMovieObj = {
            title: title, openingText: openingText, date: date,
        }
        console.log(NewMovieObj)

    }
    return (
        <>
            <Form onSubmit={formHandler} style={{ border: '1px solid gray', padding: '50px' }} >
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" name='title' />
                    <Form.Text>
                    </Form.Text>
                </Form.Group>

                <Form.Group size='lg' >
                    <Form.Label>Opening Text</Form.Label>
                    <Form.Control type="text" name='openingtext' />
                </Form.Group>
                <Form.Group >
                    <Form.Label>Release date</Form.Label>
                    <Form.Control type="text" name='date' />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Add Movie
                </Button>
            </Form>
        </>
    )

}
export default FormUserInput;