import React from "react";
import './style.scss';
import {useDispatch, useSelector} from "react-redux";
import {changeCourse} from "../../../store/actions/user";
import {hideModal} from "../../../store/actions/modal";

function CourseSelectForm() {
    const dispatch = useDispatch();
    const courses = useSelector(state => [
        state.user.courses.currentCourse,
        ...state.user.courses.userCourses,
        ...state.user.courses.otherCourses]);
    courses.sort((a,b) => {
        if (a.name <= b.name) return -1;
        return 1;
    });

    return (
        <div className="CourseSelectForm">
            {courses.map(course => (
                <div className="CourseSelectForm-Course"
                     onClick={() => {
                         dispatch(changeCourse(course.id));
                         dispatch(hideModal());
                     }}>
                    <div className="CourseSelectForm-Image">
                        <img src={course.image} alt="" />
                    </div>
                    <div className="CourseSelectForm-Text">
                        {course.name}
                    </div>
                </div>
            ))}
            <div className="CourseSelectForm-Course_hidden"/>
            <div className="CourseSelectForm-Course_hidden"/>
            <div className="CourseSelectForm-Course_hidden"/>
            <div className="CourseSelectForm-Course_hidden"/>
            <div className="CourseSelectForm-Course_hidden"/>
        </div>
    )
}
export default CourseSelectForm;