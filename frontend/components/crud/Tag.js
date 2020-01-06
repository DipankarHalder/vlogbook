import { useState, useEffect } from 'react';
import { getCookie } from '../../actions/auth';
import { create, getTags, removeTag } from '../../actions/tag';

const Tag = () => {
    const [values, setValues] = useState({
        name: '',
        tags: [],
        error: false,
        success: false,
        removed: false,
        reload: false
    });

    const {name, tags, error, success, removed, reload } = values;
    const token = getCookie('token');

    useEffect(() => {
        loadTags();
    }, [reload]);

    const loadTags = () => {
        getTags().then(data => {
            if(data.error){
                console.log(data.error);
            } else {
                setValues({...values, tags: data})
            }
        })
    };

    const showTags = () => {
        return tags.map((t, i) => {
            return (
                <span key={i} className="adminListCategory">
                    {t.name}
                    <button onClick={() => deleteConfirm(t.slug)} title="Double click to Delete" key={i}></button>
                </span>
            );
        });
    };

    const deleteConfirm = slug => {
        let answer = window.confirm('Are you sure you want to delete the tag?');
        if(answer){
            deleteTag(slug);
        }
    };

    const deleteTag = slug => {
        removeTag(slug, token).then(data => {
            if(data.error){
                console.log(data.error);
            } else {
                setValues({...values, error: false, success: false, name: '', removed: !removed, reload: !reload});
            }
        })
    }

    const clickSubmit = (e) => {
        e.preventDefault();
        create({ name }, token).then(data => {
            if(data.error){
                setValues({...values, error: data.error, success: false});
            } else {
                setValues({...values, error: false, success: true, name: '', removed: !removed, reload: !reload});
            }
        })
    };

    const handleChange = (e) => {
        setValues({...values, name: e.target.value, error: false, success: false, removed: ''});
    };

    const showSuccess = () => { 
        if(success) {
            return <p>Tag is created successfully <span onClick={mouseMoveHandler}>X</span></p> 
        }
    }
    const showError = () => { 
        if(error) {
            return <p>Tag already exist <span onClick={mouseMoveHandler}>X</span></p> 
        }
    }
    const showRemoved = () => { 
        if(removed) {
            return <p>Tag is removed successfully <span onClick={mouseMoveHandler}>X</span></p> 
        }
    }

    const mouseMoveHandler = () => {
        setValues({...values, error: false, success: false, removed: ''})
    }

    const newTagFrom = () => (
        <form onSubmit={clickSubmit}>
            <div className="left admin-app-field">
                <span>Write your tag here...</span>
                <input type="text" onChange={handleChange} value={name} requied="true" />
            </div>
            <div className="left admin-app-field-btn">
                <button type="submit" className="btn">Add Tag</button>
            </div>
        </form>
    );
    
    return (
        <React.Fragment>
            {showSuccess()}
            {showError()}
            {showRemoved()}
            
            <div className="left fwidth">
                <div className="left fwidth adminFrm">
                    {newTagFrom()}
                </div>
                <div className="left fwidth adminCategories">
                    {showTags()}
                </div>
            </div>
        </React.Fragment>
    );
};

export default Tag;