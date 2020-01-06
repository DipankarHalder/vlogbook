import { useState, useEffect } from 'react';
import { getCookie } from '../../actions/auth';
import { create, getCategories, removeCategory } from '../../actions/category';

const Category = () => {
    const [values, setValues] = useState({
        name: '',
        categories: [],
        error: false,
        success: false,
        removed: false,
        reload: false
    });

    const {name, categories, error, success, removed, reload } = values;
    const token = getCookie('token');

    useEffect(() => {
        loadCategories();
    }, [reload]);

    const loadCategories = () => {
        getCategories().then(data => {
            if(data.error){
                console.log(data.error);
            } else {
                setValues({...values, categories: data})
            }
        })
    };

    const showCategories = () => {
        return categories.map((c, i) => {
            return (
                <span key={i} className="adminListCategory">
                    {c.name}
                    <button onClick={() => deleteConfirm(c.slug)} title="Double click to Delete"></button>
                </span>
            );
        });
    };

    const deleteConfirm = slug => {
        let answer = window.confirm('Are you sure you want to delete the category?');
        if(answer){
            deleteCategory(slug);
        }
    };

    const deleteCategory = slug => {
        removeCategory(slug, token).then(data => {
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
            return <p>Category is created successfully <span onClick={mouseMoveHandler}>X</span></p> 
        }
    }
    const showError = () => { 
        if(error) {
            return <p>Category already exist <span onClick={mouseMoveHandler}>X</span></p> 
        }
    }
    const showRemoved = () => { 
        if(removed) {
            return <p>Category is removed successfully <span onClick={mouseMoveHandler}>X</span></p> 
        }
    }

    const mouseMoveHandler = () => {
        setValues({...values, error: false, success: false, removed: ''})
    }

    const newCategoryFrom = () => (
        <form onSubmit={clickSubmit}>
            <div className="left admin-app-field">
                <span>Type your category here...</span>
                <input type="text" onChange={handleChange} value={name} requied="true" />
            </div>
            <div className="left admin-app-field-btn">
                <button type="submit" className="btn">Add Category</button>
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
                    {newCategoryFrom()}
                </div>
                <div className="left fwidth adminCategories">
                    {showCategories()}
                </div>
            </div>
        </React.Fragment>
    );
};

export default Category;