import express from 'express';
const app = express();
const port = 3000;
app.use(express.json());

let movies = [];
let movieid = 1;

// adding new movie
app.post('/movies',(req,res)=>{
    const {name, price} = req.body;
    const newmovie = {id:movieid++, name, price};
    movies.push(newmovie);
    res.status(201).send(newmovie);
    
})

// getting all movies 
app.get('/movies',(req,res)=>{
    if(movies.length==0){
        return res.status(404).send('Thier is no movie yet')
    }
    res.status(200).send(movies);
})

app.get('/movies/:id',(req,res)=>{
    const movie = movies.find(m =>{
        return m.id === parseInt(req.params.id);
    })

    if(!movie){
        return res.status(404).send('movie not found');
    }
    res.status(200).send(movie);

})
app.put('/movies/:id',(req,res)=>{
    const movie = movies.find(m =>{
        return m.id === parseInt(req.params.id);
    })
    if(!movie){
        return res.status(404).send('movie not found');
    }
    
    const {name, price} = req.body;
    movie.name = name;
    movie.price = price
    res.status(201).send(movie);

})
app.delete('/movies/:id',(req,res)=>{
    const index = movies.findIndex(m =>{
        return m.id === parseInt(req.params.id);
    })
    if(!index=== -1){
        return res.status(404).send('movie not found');
    }
    movies.splice(index, 1);
    res.status(200).send('deleted');

})


app.listen(port,()=>{
    console.log(`Server is listening on port ${port}... `);
})
