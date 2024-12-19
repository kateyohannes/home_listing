package routes

import (
	controller "resturant-managment/controllers"

	"github.com/gin-gonic/gin"
)

func invoceRoutes(routes *gin.Engine) {
	routes.GET("/invoces", controller.GetInvoces())
	routes.GET("/invoce/:invoce_id", controller.GetInvoce())
	routes.POST("/invoce/add", controller.AddInvoce())
	routes.PATCH("/invoce/update/:invoce_id", controller.UpdateInvoce())
	routes.DELETE("/invoce/delete/:invoce_id", controller.DeleteInvoce())
}
