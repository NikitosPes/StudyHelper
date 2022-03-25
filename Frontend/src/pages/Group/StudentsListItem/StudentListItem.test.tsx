import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';

import { StudentsListItem } from './StudentsListItem'

const handleEditClick = jest.fn();
const handleDeleteClick = jest.fn();

const data = {
    index: 1,
    student: {
        Id: 1,
        Name: 'John',
        Surname: 'Smith',
        Email: 'John@gmail.com',
        Phone: '###########'
    },
    editHandler: handleEditClick,
    deleteHandler: handleDeleteClick
}

describe('StudentListItem component', () => {

    it('renders StudentListItem component', () => {
        render(
            <StudentsListItem index={data.index} 
                student={data.student} 
                editClickHandler={data.editHandler} 
                deleteClickHandler={data.deleteHandler}/>
        );

        expect(screen.getByText(data.index));
        expect(screen.getByText(data.student.Name));
        expect(screen.getByText(data.student.Surname));
        expect(screen.getByText(data.student.Surname));
        expect(screen.getByText(data.student.Phone));
    });
    
    it('handleEditClick works', ()=> {
        render(
            <StudentsListItem index={data.index} 
                student={data.student} 
                editClickHandler={data.editHandler} 
                deleteClickHandler={data.deleteHandler}/>
        );
        
        userEvent.click(screen.getByRole('button', {name: 'editButton'}));
        expect(handleEditClick).toHaveBeenCalled;
    });

    it('handleDeleteClick works', ()=> {
        render(
            <StudentsListItem index={data.index} 
                student={data.student} 
                editClickHandler={data.editHandler} 
                deleteClickHandler={data.deleteHandler}/>
        );
        
        userEvent.click(screen.getByRole('button', {name: 'deleteButton'}));
        expect(handleEditClick).toHaveBeenCalled;
    });
});