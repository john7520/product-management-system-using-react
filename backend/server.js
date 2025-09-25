const express = require("express");
const mysql2 = require("mysql2");
const cors = require("cors");
const dotenv = require('dotenv');
import path from "path";
dotenv.config()
let PORT = process.env.PORT;
console.log(process.env.PORT)



//create database connection
const MyConnection = mysql2.createConnection({
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.HOST,
});
//test if the database is connected
MyConnection.connect(err => {
  if (err) console.log("Database connection failed:", err.message);
  else console.log("Connected to database!");
});

const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors())

// Serve React frontend
app.use(express.static(path.join(__dirname, "../frontend/dist"))); // Vite

// Catch-all route to index.html
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
});


server.post("/add-product", (req, res) => {
  console.log(req.body)
  const { name, price, quantity, category } = req.body;
  let InsertProduct = `insert into products (name,price,quantity,category_id) values (?,?,?,?)`;
  let InsertCategory = `insert into categories (category) values (?)`;
  let insertProductWithNullCategory = `insert into products (name,price,quantity) values (?,?,?)`;
  if (name && price && quantity) {
    let id;
    if (category) {
      
      MyConnection.query("select * from categories", (err, results, fields) => {
        if (err) {
          console.log(err.message)
          res.json({ success: false, msg: err.message })
          
        } else {
          
          for (let i of results) {
            
            if (i.category === category) {
              id = i.category_id
              var category_name = i.category
              
            }
            
          }
          if (category === category_name) {
            MyConnection.query(InsertProduct, [name, price, quantity, id], (err, results, fields) => {
              if (err) {
                console.log(err.message)
                res.json({ success: false, msg: err.message })
              } else {
                res.json({ success: true, msg: "product inserted successfully." })
              }
            })
            
          } else {
            MyConnection.query(InsertCategory, [category], (err, results, fields) => {
              if (err) {
                console.log(err.message)
                res.json({ success: false, msg: err.message })
              } else {
                id = results.insertId
                MyConnection.query(InsertProduct, [name, price, quantity, id], (err, results, fields) => {
                  if (err) {
                    console.log(err.message)
                    res.json({ success: false, msg: err.message })
                  } else {
                    res.json({ success: true, msg: "product inserted successfully." })
                  }
                })
              }
            })

          }
          
        }
      })
    } else {
      MyConnection.query(insertProductWithNullCategory, [name, price, quantity], (err, results, fields) => {
        if (err) {
          console.log(err.message)
          res.json({ success: false, msg: err.message })
        } else {
          res.json({ success: true, msg: "product inserted successfully." })
        }
      })
    }
  }
});

server.get("/list-product", (req, res) => {
  let finalProducts = []
  let selectNullCategory = `select * from products where products.category_id is null`;
  let selectNotNullCategory = `select products.product_id,name,quantity,price,categories.category from products 
                                JOIN categories on products.category_id=categories.category_id;`
  MyConnection.query(selectNullCategory, (err, results, fields) => {
    if (err) {
      console.log(err.message)
      res.send(err.message)
    } else {
      for (let i of results) {
        finalProducts.push(i)
      }
      
    }
  })
  MyConnection.query(selectNotNullCategory, (err, results, fields) => {
    if (err) {
      console.log(err.message)
      res.send(err.message)
    } else {
      for (let i of results) {
        finalProducts.push(i)
      }
      res.send(finalProducts)
    }
  })
  // res.send(finalProducts)
  
})

server.delete("/delete-product", (req, res) => {
  const { id } = req.body

  MyConnection.query("select * from products", (err, results, fields) => {
    if (err) {
      res.json({ success: false, msg: err.message })
    } else {
      let check = false
      for (let i of results) {
        if (i.product_id == id) {
          check = true
          
        }
      }
      if (check) {
        let deleteQuery = `delete from products where product_id=?`
        MyConnection.query(deleteQuery, [id], (err, results, fields) => {
          if (err) {
            console.log(err.message)
            res.json({ success: false, msg: err.message })
          } else {
            res.json({ success: true, msg: "Product has deleted Successfully." })
          }
        })
      } else {
        res.json({ success: false, msg: `${id} invalid product Id.` })
      }
    }
  })
  
})

server.put("/update-product", (req, res) => {
  const { id, name, price, quantity, category } = req.body
  MyConnection.query("select * from products", (err, results, fields) => {
    if (err) {
      res.json({ success: false, msg: err.message })
      
    } else {
      let check = false
      for (let i of results) {
        if (i.product_id == id) {
          check = true
          
        }
      }
      if (check) {
        let category_id;
        let updateQuery = `update products set name=?, price=?,quantity=?,category_id=? WHERE product_id=?`
        
        MyConnection.query("select * from categories", (err, results, fields) => {
          if (err) {
            console.log(err.message)
            res.json({ success: false, msg: err.message })
            
          } else {
            for (let i of results) {
              if (i.category === category) {
                category_id = i.category_id
                break;
              }
            }
            MyConnection.query(updateQuery, [name, price, quantity, category_id, id], (err, results, fields) => {
              if (err) {
                console.log(err.message)
                res.json({ success: false, msg: err.message })
              } else {
                res.json({ success: true, msg: "product has updated successfully" })
                
              }
            })
          }
        })
      } else {
        res.json({ success: false, msg: `${id} has invalid product id.` })
        
      }
    }
  })
  
  
})
server.post("/add-category", (req, res) => {
  const { category } = req.body
  if (category) {
    MyConnection.query("select * from categories", (err, results, fields) => {
      if (err) {
        console.log(err.message)
        res.send(err.message)
      } else {
        let check = 0;
        for (let i of results) {
          if (i.category === category) {
            check = 1;
            return res.json({ success: false, message: `${category} already exists.` });
          } 
        }
        if (check === 0) {
          MyConnection.query("insert into categories (category) values (?)",[category], (err, results, fields) => {
            if (err) {
              console.log(err.message)
              res.status(500).json({ success: false, message: err.message });
            } else {
              res.json({ success: true, message: "Category inserted successfully" });
            }
          })
        }
      }
    })
  } else {
    res.send("not inserted null category")
  }

  

})

server.get("/list-category", (req, res) => {
  let queries = `select * from categories`;
  MyConnection.query(queries, (err, results, fields) => {
    if (err) {
      console.log(err.message)
      res.send(err.message)
    } else {
      res.send(results)
    }
  })
})

server.delete("/delete-category", (req, res) => {
  const { id } = req.body
  let check = false;
  MyConnection.query("select * from categories", (err, results, fields) => {
    if (err) {
      res.json({ success: false, msg: err.message })
    } else {
      for (let i of results) {
        if (i.category_id == id) {
          check = true
        }
      }
      if (check) {
        let deleteQuery = `delete from categories where category_id=?`
        MyConnection.query(deleteQuery, [id], (err, results, fields) => {
          if (err) {
            console.log(err.message)
            res.json({ "success": false, "msg": err.message })
          } else {
            res.json({ "success": true, "msg": "category has deleted successfully." })
          }
        })
        
        
      } else {
        return res.json({ success: false, msg: `${id} has invalid category id.` })
      }
    }
  })

  
  
})
PORT = PORT || 3000;
server.listen(PORT, (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log(`listening at http://localhost:${PORT}`);
  }
});
