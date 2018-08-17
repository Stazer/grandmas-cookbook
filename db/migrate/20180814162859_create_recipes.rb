class CreateRecipes < ActiveRecord::Migration[5.2]
  def change
    create_table :recipes do |t|
      t.string :name, null: false, default: ''
      t.text :description, null: false, default: ''
      t.text :cooking, null: false, default: ''
    end
  end
end
