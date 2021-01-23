import React, { useState, FormEvent } from 'react';
import './styles.css'
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';
import api from '../../services/api';

function TeacherList() {

    const [ week_day, setWeekDay ] = useState('');
    const [ subject, setSubject ] = useState('');
    const [ time, setTime ] = useState('');
    const [teachers, setTeachers] = useState([]);

async function searchTeachers(e: FormEvent){
    e.preventDefault();
    const response = await api.get('classes', {
        params: {
            subject,
            week_day,
            time,
        }
    })
    setTeachers(response.data)
}

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Esses são os proffys disponíveis.">
                <form onSubmit={searchTeachers} id="search-teachers">
                    <Select
                        name="subject"
                        label="Matéria"
                        value={subject}
                        onChange={(e) => { setSubject(e.target.value)}}
                        options={[
                            { value: 'Artes', label: 'Artes'},
                            { value: 'Biologia', label: 'Biologia'},
                            { value: 'Ciências', label: 'Ciências'},
                            { value: 'Eucação física', label: 'Eucação física'},
                            { value: 'Geografica', label: 'Geografica'},
                            { value: 'História', label: 'História'},
                            { value: 'Matemática', label: 'Matemática'},
                            { value: 'Português', label: 'Português'}
                        ]}
                    />
                    <Select
                        name="week_day"
                        label="Dia da semana"
                        value={week_day}
                        onChange={(e) => { setWeekDay(e.target.value)}}
                        options={[
                            { value: '0', label: 'Domingo'},
                            { value: '1', label: 'Segunda-feira'},
                            { value: '2', label: 'Terça-feira'},
                            { value: '3', label: 'Quarta-feira'},
                            { value: '4', label: 'Quinta-feira'},
                            { value: '5', label: 'Sexta-feira'},
                            { value: '7', label: 'Sábado'}
                        ]}
                    />
                    <Input
                        value={time}
                        onChange={(e) => {
                        setTime(e.target.value)}}
                        type="time"
                        name="time"
                        label="Hora"
                    />
                    <button type="submit">
                        Buscar
                    </button>
                    
                </form>
            </PageHeader>
            <main>
                {teachers.map((teacher: Teacher) => (
                    <TeacherItem 
                        teacher={teacher}
                        key={teacher.id}
                    />
                ))}
            </main>
        </div>
    )
}

export default TeacherList;