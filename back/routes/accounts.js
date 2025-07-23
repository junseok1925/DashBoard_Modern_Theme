const express = require("express");
const bcrypt = require("bcrypt"); //암호화 프로그램

const { User } = require("../models");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

const router = express.Router();
//모든계정가져오기
router.get("/", async (req, res, next) => {
  //GET accounts
  try {
    const accounts = await User.findAll({
      order: [["createdAt", "ASC"]],
      attributes: ["id", "userid", "username", "authority", "section"],
    });
    res.status(200).json(accounts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//계정 삭제
router.delete("/:id", async (req, res, next) => {
  try {
    await User.destroy({
      where: { id: req.params.id },
      //authority: 1,
    });
    res.json({ userid: req.body.userid });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//권한수정
router.patch("/authority", isLoggedIn, async (req, res, next) => {
  try {
    await User.update(
      {
        authority: req.body.authority,
      },
      {
        where: { id: req.body.id },
      }
    );
    res.status(200).json({ Authority: req.body.authority });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 사용자 유형 수정
router.patch("/section", isLoggedIn, async (req, res, next) => {
  try {
    await User.update(
      {
        section: req.body.section,
      },
      {
        where: { id: req.body.id },
      }
    );
    res.status(200).json({ section: req.body.section });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//비밀번호변경
router.patch("/password", isLoggedIn, async (req, res, next) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  try {
    await User.update(
      {
        password: hashedPassword,
      },
      {
        where: { id: req.body.id },
      }
    );
    res.status(200).json({ Authority: req.body.authority });
  } catch (error) {
    console.error(error);
    next(error);
  }
});
module.exports = router;
