class Task < ActiveRecord::Base
  attr_accessible :name, :completed, :position
end
