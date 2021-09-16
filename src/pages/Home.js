import React, { useState, useEffect } from 'react';
import './Home.css';

const database_url = 'http://localhost:4000';

const Home = () =>{

    const [tarefas, setTarefas] = useState([]);
    const [nomeTarefa, setNome] = useState("");
    const [descricaoTarefa, setDescricao] = useState("");
    const [situacaoTarefa, setSituacao] = useState("");
    const [alteracaoTarefa, setAlteracao] = useState("");
    const [editando, setEditando] = useState(false);
    const [idEditando, setIdEditando] = useState(null);

    const loadTarefas = async() => {
        const response = await fetch(`${database_url}/tarefas`);
        const data = await response.json();
        setTarefas(data);
    };

    useEffect(() =>{
        loadTarefas();
    }, []);

    useEffect(() =>{
        if(idEditando !== null && editando){
            const tarefa = tarefas.find((t) =>t._id === idEditando);
            setNome(tarefa.nome);
            setDescricao(tarefa.descricao);
            setSituacao(tarefa.situacao);
            setAlteracao(tarefa.alteracao);
        }
    }, [idEditando]);

    const onSubmit = async (e) =>{
        e.preventDefault();
        
        if(editando) {
            await fetch(`${database_url}/tarefas/update/${idEditando}`,{
                method: 'PUT',
                headers: {'Content-Type': 'Application/json',
            },
            body: JSON.stringify({
                nomeTarefa: nomeTarefa,
                descricaoTarefa: descricaoTarefa,
                prioridadeTarefa: situacaoTarefa,
                alteracaoTarefa: alteracaoTarefa,
            }),
        });

        setEditando(false);
        setIdEditando(null);
        }else{
            await fetch(`${database_url}/tarefas/add`,{
                method: 'POST',
                headers: {'Content-Type': 'application/json',
            },
                body: JSON.stringify({
                    nomeTarefa: nomeTarefa,
                    descricaoTarefa: descricaoTarefa,
                    prioridadeTarefa: situacaoTarefa,
                    alteracaoTarefa: alteracaoTarefa,
                }),
            });
        }

        loadTarefas();
        setNome('');
        setDescricao('');
        setSituacao('');
        setAlteracao('');
    };

    const deletar = async(id) =>{
        await fetch(`${database_url}/tarefas/delete/${id}`, {
            method: 'DELETE'
        });
        loadTarefas();
    };

    return(
        <>
            <div className='container'>
                <h1>Minhas Tarefas</h1>
                <h1>{editando ? `Editando: ${tarefas.find((t) => t._id === idEditando)?.nomeTarefa}`: "Cadastre uma nova Tarefa!!"}</h1>

                <div>
                    <form className='cad-tdl' onSubmit={onSubmit}>
                        <div className='cad-tdl-item'>
                            <label>Tarefa</label>
                            <input placeholder='  Nome da Tarefa' value={nomeTarefa} onChange={(e) =>{setNome(e.target.value);}} className='input-cad' required />
                        </div>
                        <div className='cad-tdl-item'>
                            <label>Descrição</label>
                            <input placeholder=' Descrição Tarefa' value={descricaoTarefa} onChange={(e) =>{setDescricao(e.target.value);}} className='input-cad' required />
                        </div>
                        <input className='btn-cad' type='submit' value='Cadastrar'/>
                    </form>
                </div>
                <div className='list-tdl'>
                    <div className='list-td'>
                        {tarefas.map((t, index) =>(
                            <div className='list-td-2'>
                                <div key={index}></div>
                                    <div>
                                        <h2>{t.nomeTarefa}</h2>
                                    </div>
                                    <div>
                                        <h4>{t.descricaoTarefa}</h4>
                                    </div>
                                    <div>
                                        <p>{t.situacaoTarefa}</p>
                                    </div>
                                    <div>
                                        <p>{t.alteracaoTarefa}</p>
                                    </div>
                                <button className='btn-editar' onClick={()=> {setEditando(true);setIdEditando(t._id)}}>Editar</button>
                                <button className='btn-excluir' onClick={()=> deletar(t._id)}>Deletar</button>
                            </div>)
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;