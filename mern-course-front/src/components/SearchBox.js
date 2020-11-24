import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

const SearchBox = () => {
    const history = useHistory()
    const [keyword, setKeyword] = useState("")
    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword.trim()) {
            history.push(`/search/${keyword}`)
        } else {
            history.push(`/`)
        }
    }
    return (
        <Form onSubmit={submitHandler} inline>
            <Form.Control type="text" name="q" placeholder="Search products" className="mr-sm-2 ml-sm-3" onChange={(e) => setKeyword(e.target.value)} />
            <Button type="submit" variant="outline-success" className="p-2">Search</Button>
        </Form>
    )
}

export default SearchBox
