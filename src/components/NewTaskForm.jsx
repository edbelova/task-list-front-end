import { useState } from 'react';
import PropTypes from 'prop-types';
import './NewTaskForm.css';

const kDefaultsFormState = {
  title: '',
  isComplete: 'false',
};



const NewTaskForm = ({ onAddNewTask }) => {
  const [formData, setFormData] = useState(kDefaultsFormState);
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    onAddNewTask(formData);
    setFormData(kDefaultsFormState);
  };
  return (
    <form onSubmit={handleSubmit} className="form-field">
      <h2>Add a Task</h2>
      <div className='formTitle'>
        <label htmlFor="title">Title</label>
        <input id="title" name="title" type="text" value={formData.title} onChange={handleChange} />
      </div>
      <div className='formIsComplete'>
        <label htmlFor="isComplete">isComplete</label>
        <select name="isComplete" id="isComplete" value={formData.isComplete} onChange={handleChange}>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>
      <div className='submitButton'>
        <input type="submit" value="Add Task" />
      </div>
    </form>
  );
};

NewTaskForm.propTypes = {
  onAddNewTask: PropTypes.func.isRequired,
};
export default NewTaskForm;