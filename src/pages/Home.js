import React, { useState, useEffect } from 'react';
import './Home.css';

const database_url = 'http://localhost:3000';

const Home = () =>{

    const [tarefas, setTarefas] = useState([]);
    const [nomeTarefa, setNomeTarefa] = useState('');
    const [descricaoTarefa, setDescricao] = useState('');
    const [situacaoTarefa, setSituacao] = useState('');
    const [alteracaoTarefa, setAlteracao] = useState('');
    const [editando, setEditando] = useState(false);
    const [idEditando, setIdEditasndo] = useState(null);

    const carregaTarefas = async() => {
        const Response = await fetch(`${database_url}/tarefas`);
        const data = await Response.json();
        setTarefas(data);
    };

    useEffect(() =>{
        carregaTarefas();
    }, []);

    useEffect(() =>{
        if(idEditando !== null && editando){
            const tarefa = tarefas.find((t) =>t.id === idEditando);
            setNomeTarefa(tarefa.nomeTarefa);
            setDescricao(tarefa.descricaoTarefa);
            setSituacao(tarefas.situacaoTarefa);
            setAlteracao(tarefa.alteracaoTarefa);
        }
    }, [idEditando]);

    const onSubmit = async (e) =>{
        e.preventDefault();
        
        if(editando) {
            await fetch(`${database_url}/tarefas/${idEditando}`,{
                method: 'PUT',
                headers: {'Content-Type': 'Application/json',
            },
            body: JSON.stringify({
                tarefa: nomeTarefa,
                descricao: descricaoTarefa,
                prioridade: situacaoTarefa,
                alteracao: alteracaoTarefa,
            }),
        });

        setEditando(false);
        setIdEditasndo(null);
        }else{
            await fetch(`$(datbase_url)/tarefas`,{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    tarefa: nomeTarefa,
                    descricao: descricaoTarefa,
                    prioridade: situacaoTarefa,
                    alteracao: alteracaoTarefa,
                }),
            });
        }

        carregaTarefas();
        setNomeTarefa('');
        setDescricao('');
        setSituacao('');
        setAlteracao('');
    };

    const deletar = async(id) =>{
        await fetch(`${database_url}/tarefas/$(id)`, {
            method: 'DELETE',
        });
        carregaTarefas();
    };

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
                        {tarefas.map((t, index) =>(
                            <div>
                                <li key={index}></li>
                                <h2>{t.nomeTarefa}</h2>
                                <h4>{t.descricaoTarefa}</h4>
                                <p>{t.situacaoTarefa}</p>
                                <p>{t.alteracaoTarefa}</p>
                            </div>)
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;