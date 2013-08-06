class TasksController < ApplicationController
  # GET /tasks
  # GET /tasks.json
  def index
    @tasks = Task.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @tasks }
    end
  end

  # GET /tasks/1
  # GET /tasks/1.json
  def show
    @task = Task.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @task }
    end
  end

  # GET /tasks/new
  # GET /tasks/new.json
  def new
    @task = Task.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @task }
    end
  end

  # GET /tasks/1/edit
  def edit
    @task = Task.find(params[:id])
  end

  # POST /tasks
  # POST /tasks.json
  def create
    @task = Task.new(params[:task])

    respond_to do |format|
      if @task.save
        format.html { redirect_to @task, notice: 'Task was successfully created.' }
        format.json { render json: @task, status: :created, location: @task }
      else
        format.html { render action: "new" }
        format.json { render json: @task.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /tasks/1
  # PUT /tasks/1.json
  def update
    @task = Task.find(params[:id])

    respond_to do |format|
      if @task.update_attributes(params[:task])
        format.html { redirect_to @task, notice: 'Task was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @task.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /tasks/1
  # DELETE /tasks/1.json
  def destroy
    @task = Task.find(params[:id])
    @task.destroy

    respond_to do |format|
      format.html { redirect_to tasks_url }
      format.json { head :no_content }
    end
  end

  #ajax sort method response
  def sort
    Rails.logger.info("PARAMS: #{params.inspect}") #dump output to log file to see what we got.
    # Parameters: {"{\"tasks\":"=>{"{\"object_id\":2},{\"object_id\":1},{\"object_id\":3}"=>{"}"=>nil}}}
    # Parameters: {"2,1,3"=>nil}

    respond_to do |format|
      format.json {

        params['tasks'].each do |index, task|
          raise task.inspect
          t = Task.find_by_id(task.object_id)
          t.position = index
          t.save
        end 

        redirect_to tasks_url
      }
    end

    #Ruby parse JSON string
    #require 'json'
    #tasks = JSON.parse params['tasks']



    # params.each do |index, task|
    #   t = Task.find_by_id(task.object_id)
    #   t.position = index
    #   t.save
    # end 

    #  respond_to do |format|
    #    format.html { redirect_to tasks_url }
    #   format.json { head :no_content }
    # end
  end
end
