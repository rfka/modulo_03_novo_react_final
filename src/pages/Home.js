import React from 'react';
import './Home.css'

const Home = () =>{
    return(
        <>
            <div className='container'>
                <h1>Minhas Tarefas</h1>
                <div className='cad-tdl'>
                    <div className='cad-tdl-item'>
                        <label>Tarefa</label>
                        <input className='input-cad' type='text' />
                    </div>
                    <div className='cad-tdl-item'>
                        <label>Descrição</label>
                        <input className='input-cad' type='text' />
                    </div>
                    <button className='btn-cad'>Cadastrar Tarefa</button>
                </div>
                <div className='list-tdl'>
                    <div className='list-td'>
                        <h2>Tarefa 1</h2>
                        <h4>teste da tarefa 1</h4>
                    </div>
                    <div className='list-td'>
                        <h2>Tarefa 2</h2>
                        <h4>teste da tarefa 2</h4>
                    </div>
                    <div className='list-td'>
                        <h2>Tarefa 3</h2>
                        <h4>teste da tarefa 3</h4>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;