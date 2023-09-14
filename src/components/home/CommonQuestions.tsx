import React from 'react'
import TitleHeader from '../ui/TitleHeader'
import AccordionBox from './AccordionBox'

const data = [
    {
        id:1,
        question:"Wha is Hire me?",
        answer:"Hire me platform is an Arabic platform that helps you reach the best professional freelancers to contract with them to carry out your work and projects via the Internet, as well as enabling creators to find a place to work and generate income."
    },
    {
        id:2,
        question:"How do I benefit from it?",
        answer:" you can add your project, such as creating a website or mobile application, or even designing a logo, and receive offers from professional freelancers interested in working on it, to compare offers and choose the best one, then hire the freelancer with the best offer and follow up with him until the completion of the implementation of your project. You can also search for yourself. The best freelancers and offer them your project directly to work on it."
    },
    {
        id:3,
        question:"How do I guarantee my rights?",
        answer:"Your financial right is fully guaranteed, so there is no need for any concern. Be assured when creating any new projects or submitting your offers on the projects presented on the site, as an independent site plays the role of mediator between the owner of the project and the freelancer and protects the financial rights of both parties in the event of compliance with the terms of an independent site and the terms of the guarantee And clarify the agreement completely."
    },
    {
        id:4,
        question:"What will happen after my project is published?",
        answer:"After publishing your project, it will remain pending for review by technical support, and after that it will either be approved and you will receive a notification of approval, then the project will appear to all freelancers to submit their offers on it, or it will be rejected with a mention of the reasons that led to that in order for you to amend it and send it again for review and acceptance."
    }
]

export default function CommonQuestions() {
    return (
        <div className='Container my-24'>
            <TitleHeader title="CommonQuestions"/>
            <div>
                {
                    data.map(item=><AccordionBox key={item.id} item={item}/>)
                }
            </div>
        </div>
    )
}
