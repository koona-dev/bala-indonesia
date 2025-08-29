class UsersController {
  renderUsers = (req, res) => {
    res.render("admin/users/index");
  };

  renderCreateUser = (req, res) => {
    res.render("shared/create-user");
  };

  renderUpdateUser = (req, res) => {
    res.render("shared/create-user");
  };
}

export default UsersController;