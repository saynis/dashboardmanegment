import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Post
export const postAuthor = async (req, res) => {
  const { authorname, birthdate, deathdate, nationality, authorimage, sex } = req.body;
  if(!authorname || !nationality || !sex ){
      res.status(403).json({
            message: "Couldn't be empty"
      })
  }else{
        const authors = await prisma.authors.create({
          data: {
            authorname,
            birthdate,
           
            nationality,
            authorimage,
            sex
          },
        });
        res.status(201).json
        ({
            message: "Author SuccessFully Completed"
        })
  }
};
// Get
export const getAuthors = async(req,res)=>{
      const authors = await prisma.authors.findMany();
      res.json({
            status: "Success Gated All Authors",
            authors
      });
};
// Update
export const updateAuthors= async(req,res)=>{
      const {authorname, birthdate, deathdate, nationality, authorimage, sex} = req.body;
      const {id} = req.params;
      if(!authorname  || !nationality || !sex){
            res.status(403).json({
                  message: "Couldn't be empty"
            })
            return;
      }
      const author = await prisma.authors.update({
            where:{
                  authorid: +id
            },
            data:{
                  authorname,
                  birthdate,
                  nationality,
                  authorimage,
                  sex
            }
      });
      res.status(200).json({
            message: `Successfully Updated Author on: ${id}`
      })
};

// Delete
export const deleteAuthor = async(req,res)=>{
      const {id} = req.params;
      const author = await prisma.authors.delete({
            where:{
                  authorid: +id
            }
      });
      res.status(200).json({
            message: `Successfully Deleted Author on: ${id}`
      })
};
// Filter
export const filterAuthor = async(req,res)=>{
      const {id} = req.params;
      const author = await prisma.authors.findFirst({
            where:{
                  authorid: +id
            }
      });
      if(!author){
            return res.status(404).json({message: "Author not found"})
          }
      res.status(200).json({
            message: `Successfully filtered Author on: ${id}`,
            author
      })
};