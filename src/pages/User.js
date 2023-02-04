import { useEffect, useState } from "react";
import EditableList from 'react-list-editable';
import 'react-list-editable/lib/react-list-editable.css';

import style from '../styles/User.module.css'

export default function User({user}){
    return(
        <div className={style.main}>
            <div className={style.name}>{user.name}</div>
            <div className={style.usertype}>{user.isMentor ? "Mentor" : "Mentee"} Account</div>
            <hr />
            {user.isMentor ? <Mentor user={user}/> : <Mentee user={user}/>}
        </div>
    )
}


function Mentee({user}){
    const [file, setFile] = useState()
    const [interests, setInterests] = useState([])
    const [mentors, setMentors] = useState([])

    function uploadFile() {
        setInterests(['maths', 'physics', 'engineering'])
        fetch('https://someapi', {
          method: 'POST',
          body: file,
        })
          .then(response => response.json())
          .then(success => {
            // Do something with the successful response
          })
          .catch(error => console.log(error)
        );
    }

    const fileChangeHandler = (event) => {
		setFile(event.target.files[0]);
	};

    const setNewInterest = () => {
        fetch('https://someapi', {
          method: 'POST',
          body: interests,
        })
          .then(response => response.json())
          .then(success => {
            // Do something with the successful response
          })
          .catch(error => console.log(error)
        );
    }
    const findMentors = () => {
        setMentors([{id: 2,name: "Rohan", isMentor: true}, {id: 3,name: "John", isMentor: true}, {id: 4,name: "Kross", isMentor: true}])
        fetch('https://someapi', {
          method: 'POST',
          body: interests,
        })
          .then(response => response.json())
          .then(success => {
            // Do something with the successful response
          })
          .catch(error => console.log(error)
        );
    }

    return (
        <div className={style.mentee}>
            <div className={style.interest_container}>
                <div className={style.intrestshead}>Intrests</div>
                <div className={style.intrests}>
                    {interests.map((interest, index) => 
                        <div className={style.interest}>
                            {/* <div className={style.interest-name} onChange={(e) => {
                                let newInterest = e.target.value
                                let interests_copy = interests
                                interests_copy[index] = newInterest
                                setInterests(interests_copy)
                            }}>{index + 1}. <input type="text" defaultValue={interest}/></div>
                            <button className={style.interest}del" onClick={() => {
                                let interests_copy = [...interests]
                                interests_copy.splice(index, 1)
                                setInterests(interests_copy)
                            }}>DELETE</button> */}
                            <div className={style.interest_name}>{interest}</div>
                        </div>
                    )}

                </div>
                {/* {interests != 0 ? <button onClick={() => {console.log(interests); setNewInterest()}}>Save Changes</button> : ''} */}
                {interests != 0 ? <button onClick={findMentors}>Find Mentors 🔎</button> : ''}
            {mentors != 0 ? <MentorList mentors={mentors}/> : ''}
            </div>
            <div className={style.file}>
                <input type="file" name="file" onChange={fileChangeHandler}/>
                <button onClick={uploadFile}>Submit</button>
            </div>
        </div>
    )
}

function MentorList({mentors}) {
    function contactMentor(mentorId){
        fetch(`https://someapi/${mentorId}`)
          .then(response => response.json())
          .then(success => {
            // Do something with the successful response
          })
          .catch(error => console.log(error)
        );
    }
    return (
        <div className={style.mentors}>
            {mentors.map(mentor => <div className={style.mentorcont}>
                <div className={style.mentor_name}>{mentor.name}</div>
                <button className={style.contact} onClick={() => {contactMentor(mentor.id)}}>Contact Mentor</button>
            </div>)}
        </div>
    )
}


function Mentor({user}){
    const [skills, setSkills] = useState([])
    const [changed, setChanged] = useState(false)

    function saveMentorSkills() {
        fetch('https://someapi', {
          method: 'POST',
          body: skills,
        })
          .then(response => response.json())
          .then(success => {
            // Do something with the successful response
            setChanged(false)
          })
          .catch(error => console.log(error)
        );
    }

    return (
        <div className={style.mentor}>
            <div className={style.skillheadcont}>
                <div className={style.skillhead}>Your Skills</div>
                {changed ? <button className={style.savechanges} onClick={saveMentorSkills}>Save</button> : 
                <div className={style.synced}>[Synced]</div>}
            </div>
            <div className="list">
                <EditableList
                list={skills}
                onListChange={(e) => {setSkills(e); setChanged(true)}}
                placeholder='Enter a value'
                />
            </div>
        </div>
    )
}
