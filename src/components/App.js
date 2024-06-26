import React, { useState, useEffect } from 'react'
import Friend from './Friend'
import FriendForm from './FriendForm'
import schema from '../validation/formSchema'
import axios from 'axios'
import * as yup from 'yup'
// 🔥 STEP 1- CHECK THE ENDPOINTS IN THE README
// 🔥 STEP 2- FLESH OUT FriendForm.js
// 🔥 STEP 3- FLESH THE SCHEMA IN ITS OWN FILE
// 🔥 STEP 4- IMPORT THE SCHEMA, AXIOS AND YUP

const initialFormValues = {
  username: '',
  email: '',
  role: '',
  civil: '',
  hiking: false,
  reading: false,
  coding: false,
}

const initialFormErrors = {
  username: '',
  email: '',
  role: '',
  civil: '',
}
const initialFriends = []
const initialDisabled = true


export default function App() {

  const [friends, setFriends] = useState(initialFriends)          // array of friend objects
  const [formValues, setFormValues] = useState(initialFormValues) // object
  const [formErrors, setFormErrors] = useState(initialFormErrors) // object
  const [disabled, setDisabled] = useState(initialDisabled)       // boolean

  const getFriends = () => {

    // 🔥 STEP 5- IMPLEMENT! ON SUCCESS PUT FRIENDS IN STATE
    //    helper to [GET] all friends from `http://buddies.com/api/friends`

    axios.get(`http://buddies.com/api/friends`)
      .then(res => {
        console.log(res)
        setFriends(res.data)
      })
      .catch( err => console.log(err))
  }

  const postNewFriend = newFriend => {
    // 🔥 STEP 6- IMPLEMENT! ON SUCCESS ADD NEWLY CREATED FRIEND TO STATE
    //    helper to [POST] `newFriend` to `http://buddies.com/api/friends`
    //    and regardless of success or failure, the form should reset

    axios.post(`http://buddies.com/api/friends`, newFriend)
      .then (res => {
        console.log(res.data.message)
        setFriends([res.data, ...friends])
        setFormValues(initialFormValues)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const inputChange = (name, value) => {
    // 🔥 STEP 10- RUN VALIDATION WITH YUP
    name === 'username'? value = value.trim() : null
    name === 'email'? value = value.trim() : null

    yup.reach(schema, name).validate(value)
      .then ( () => {
        setFormErrors({...formErrors, [name]: ''})
      })
      .catch(err => {
        setFormErrors({...formErrors, [name]: err.errors[0]})
      })

    setFormValues({
      ...formValues,
      [name]: value
    })
  }

  const formSubmit = () => {
    const newFriend = {
      username: formValues.username.trim(),
      email: formValues.email.trim(),
      role: formValues.role.trim(),
      civil: formValues.civil.trim(),
      hiking: formValues.hiking,
      reading: formValues.reading,
      coding: formValues.coding
      // 🔥 STEP 7- WHAT ABOUT HOBBIES?
    }
    // 🔥 STEP 8- POST NEW FRIEND USING HELPER

    postNewFriend(newFriend)
  }

  useEffect(() => {
    getFriends()
  }, [])

  useEffect(() => {
    // 🔥 STEP 9- ADJUST THE STATUS OF `disabled` EVERY TIME `formValues` CHANGES
    schema.isValid(formValues)
      .then(isValid => {
        setDisabled(!isValid)
      }) 
      .catch(err => console.log(err))
  }, [formValues])

  return (
    <div className='container'>
      <header><h1>Friends App</h1></header>

      <FriendForm
        values={formValues}
        change={inputChange}
        submit={formSubmit}
        disabled={disabled}
        errors={formErrors}
      />

      {
        friends.map(friend => {
          return (
            <Friend key={friend.id} details={friend} />
          )
        })
      }
    </div>
  )
}
