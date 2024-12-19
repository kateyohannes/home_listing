package routes

import (
	controller "resturant-managment/controllers"

	"github.com/gin-gonic/gin"
)

func MenuRoutes(routes *gin.Engine) {
	routes.GET("/menus", controller.GetMenus())
	routes.GET("/menu/:menu_id", controller.GetMenu())
	routes.POST("/menu/add", controller.AddMenu())
	routes.PATCH("/menu/update/:menu_id", controller.UpdateMenu())
	routes.DELETE("/menu/delete/:menu_id", controller.DeleteMenu())
}
