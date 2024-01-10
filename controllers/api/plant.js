const router = require('express').Router();
const axios = require('axios');
router.get('/list', async (req, res) => {

 const data = await axios.get('https://perenual.com/api/species-list?key=sk-dCkw65936680487233623')
 console.log(JSON.stringify(data.data, null, 2));
  res.json(data.data)
})

router.get('/species/:species_id', async (req, res) => {

  const data = await axios.get(`https://perenual.com/api/species/details/${req.params.species_id}?key=sk-dCkw65936680487233623`)
  console.log(JSON.stringify(data.data, null, 2));
   res.json(data.data)
 })



module.exports = router;