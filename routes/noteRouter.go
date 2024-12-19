package routes

import (
	controller "resturant-managment/controllers"

	"github.com/gin-gonic/gin"
)

func NoteRoutes(routes *gin.Engine) {
	routes.GET("/notes", controller.GetNotes())
	routes.GET("/note/:note_id", controller.GetNote())
	routes.POST("/note/add", controller.AddNote())
	routes.PATCH("/note/update/:note_id", controller.UpdateNote())
	routes.DELETE("/note/delete/:note_id", controller.DeleteNote())
}
