package routes

import (
	controller "resturant-managment/controllers"

	"github.com/gin-gonic/gin"
)

func TableRoutes(routes *gin.Engine) {
	routes.GET("tables", controller.GetTables())
	routes.GET("/table/:table_id", controller.GetTable())
	routes.POST("/table/add", controller.AddTable())
	routes.PATCH("/table/update/:table_id", controller.UpdateTable())
	routes.DELETE("/table/delete/:table_id", controller.DeleteTable())
}
