class AjaxController < ApplicationController

  def posts
    posts = Post.page(params[:page]).per(10)
    render partial: "page", locals: { posts: posts }
  end

end
