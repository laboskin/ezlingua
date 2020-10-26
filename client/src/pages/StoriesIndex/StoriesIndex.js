import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import './style.scss';
import MainContainer from "../../hoc/MainContainer/MainContainer";
import {clearStories, loadStories} from "../../store/actions/stories";
import StoryCard from "../../components/StoryCard/StoryCard";
import {useTranslation} from "react-i18next";

function StoriesIndex() {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const currentCourse = useSelector(state => state.user.courses.currentCourse);
    const stories = useSelector(state => state.stories.stories);

    useEffect(() => {
        dispatch(loadStories());
        return () => {
            dispatch(clearStories());
        }
    }, [dispatch, currentCourse]);

    return (
        <MainContainer maxWidth="900px">
            <div className="StoriesIndex-Title">
                {t('storiesIndex.stories')}
            </div>
            <div className="StoriesIndex-Cards">
                {stories && stories.map(story => (
                    <StoryCard id={story.id}
                               name={story.name}
                               image={story.image}
                               isUserStory={story.isUserStory}
                               key={story.id}
                    />
                ))}
                <StoryCard hidden />
                <StoryCard hidden />
                <StoryCard hidden />
                <StoryCard hidden />
                <StoryCard hidden />
            </div>
        </MainContainer>
    )
}

export default StoriesIndex;
