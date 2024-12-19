package main

import (
	"os"
	"fmt"
	route "resturant-managment/routes"
	"github.com/gin-gonic/gin"
)

func main() 
	port := os.Getenv("PORT")
	if port == "" {
		port = "3030"
	}

	fmt.Print(port)

	r := gin.Default()
	r.Use(gin.Logger())
	r.UserRoutes(route)
	r.Use(middleware.Authentication())

	r.FoodRouters(route)
	r.InvoiceRouters(route)
	r.MenuRouters(route)
	r.NoteRouters(route)
	r.OrderRouters(route)
	r.OrderItemRouters(route)
	r.TableRouters(route)
}
