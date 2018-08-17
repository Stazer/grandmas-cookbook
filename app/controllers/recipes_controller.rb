class RecipesController < ApiController
  def create
    render json: Recipe.create(params.require(:recipe).permit(:name, :description, :cooking))
  end

  def index
    render json: Recipe.all
  end

  def update
    recipe = Recipe.find params[:id]
    recipe.update(params.require(:recipe).permit(:name, :description, :cooking))
    render json: recipe
  end

  def destroy
    Recipe.destroy params[:id]
  end
end
