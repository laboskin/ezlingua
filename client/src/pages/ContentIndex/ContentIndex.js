import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import './style.scss';
import MainContainer from "../../hoc/MainContainer/MainContainer";
import {clearContents, loadContents} from "../../store/actions/content";
import ContentCard from "../../components/ContentCard/ContentCard";

function ContentIndex() {
    const dispatch = useDispatch();
    const currentCourse = useSelector(state => state.user.courses.currentCourse);
    const contentList = useSelector(state => state.content.all);

    useEffect(() => {
        dispatch(loadContents());

        return () => {
            dispatch(clearContents());
        }
    }, [dispatch, currentCourse]);

    return (
        <MainContainer maxWidth="900px">
            <div className="ContentIndex-Title">
                Content
            </div>
            <div className="ContentIndex-Cards">
                {contentList && contentList.map(content => (
                    <ContentCard contentId={content.id}
                                 contentName={content.name}
                                 image={content.image}
                                 isUserContent={content.isUserContent}
                    />
                ))}
                <ContentCard hidden />
                <ContentCard hidden />
                <ContentCard hidden />
                <ContentCard hidden />
                <ContentCard hidden />
            </div>
        </MainContainer>
    )
}

export default ContentIndex;
