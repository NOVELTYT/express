import express from 'express';

const app = express();
const port = 3000;
app.use(express.json());

let teadata = [];
let nextid = 1;

app.post('/teas', (req, res) => {
    const { name, price } = req.body
    const newtea = { id: nextid++, name, price};
    teadata.push(newtea);
    res.status(201).send(newtea);
    console.log(teadata)
})

app.get('/teas', (req, res) => {
    res.status(200).send(teadata);
})

app.get('/teas/:id', (req, res) => {
    const tea = teadata.find(t => {
       return t.id === parseInt(req.params.id)
    });

    if (!tea) {
        return res.status(404).send('Tea not found');
    }
    res.status(200).send(tea);
    console.log(tea)

})

app.put('/teas/:id', (req, res) => {

    const tea = teadata.find(t => {
        return t.id === parseInt(req.params.id)
    });

    if (!tea) {
        return res.status(404).send('Tea not found');
    }

    const { name, price } = req.body;
    tea.name = name;
    tea.price = price;
    res.status(200).send(tea);
})

app.delete('/teas/:id', (req,res)=>{
    const index = teadata.findIndex(t =>{
           return t.id === parseInt(req.params.id);
    })
    if(index === -1){
        return res.status(404).send('Tea not found for deleting')
    
    }
    teadata.splice(index, 1)
    return res.status(200).send('deleted');
})




app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
});