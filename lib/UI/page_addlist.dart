import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:moo/Moor_Database/Moor_Database.dart';
import 'package:flutter_material_color_picker/flutter_material_color_picker.dart';
import 'icon_picker.dart';
import 'Todo_badge.dart';

class AddCardScreen extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return AddCardScreenState();
  }
}

class AddCardScreenState extends State<AddCardScreen> {
  Icon Actualicon = Icon(Icons.satellite);
  int pickedcolor = Colors.redAccent.value;

  DateTime newTaskDate;
  String tasktext;
  String subtasktext = '';
  IconData icontask = Icons.work;
  final controller = TextEditingController();

  void addtask() {
    print(tasktext);
    final database = Provider.of<AppDatabase>(context);
    final task = Task(name: tasktext, color: pickedcolor, icon:icontask.codePoint , subtask: subtasktext);
    database.insertTask(task);
  }

  var _scaffoldKey;
  @override
  Widget build(BuildContext context) {
    print(Icon(Icons.face).toStringShort());
    return Scaffold(
      key: _scaffoldKey,
      backgroundColor: Colors.white,
      appBar: AppBar(
        title: Text(
          'New Task',
          style: TextStyle(color: Colors.black),
        ),
        centerTitle: true,
        elevation: 0,
        iconTheme: IconThemeData(color: Colors.black26),
        brightness: Brightness.light,
        backgroundColor: Colors.white,
      ),
      body: Container(
        constraints: BoxConstraints.expand(),
        padding: EdgeInsets.symmetric(horizontal: 36.0, vertical: 36.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              height: 16.0,
            ),
            TextField(
              controller: controller,
              onChanged: (String text) {
                setState(() {
                  tasktext = text;
                });
                print(tasktext);
              },
              onSubmitted: (String text) {
                setState(() {
                  tasktext = text;
                });
                print(tasktext);
              },
              cursorColor: Color(pickedcolor),
              autofocus: true,
              decoration: InputDecoration(
                  border: InputBorder.none,
                  hintText: 'Task...',
                  hintStyle: TextStyle(
                    color: Colors.black26,
                  )),
              style: TextStyle(
                  color: Colors.black54,
                  fontWeight: FontWeight.w500,
                  fontSize: 36.0),
            ),
            TextField(
              onChanged: (String text) {
                setState(() {
                  subtasktext = text;
                });
                print(subtasktext);
              },
              onSubmitted: (String text) {
                setState(() {
                  subtasktext = text;
                });
                print(subtasktext);
              },
              cursorColor: Color(pickedcolor),
              autofocus: true,
              decoration: InputDecoration(
                  border: InputBorder.none,
                  hintText: 'SubTask...',
                  hintStyle: TextStyle(
                    color: Colors.black26,
                  )),
              style: TextStyle(
                  color: Colors.black54,
                  fontWeight: FontWeight.w500,
                  fontSize: 26.0),
            ),
            Container(
              height: 26.0,
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                IconButton(
                  icon: Icon(Icons.color_lens),
                  iconSize: 40,
                  color: Color(pickedcolor),
                  onPressed: () {
                    showDialog(
                        context: context, builder: (_) => Colorpicker(context));
                  },
                ),
                Colorpickerbuilder(
                    highlightColor: Color(pickedcolor),
                    iconData: icontask,
                    action: (newIcon) => setState(() => icontask = newIcon)),
              ],
            ),
          ],
        ),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerFloat,
      floatingActionButton: Builder(
        builder: (BuildContext context) {
          return FloatingActionButton.extended(
              backgroundColor: Color(pickedcolor),
              icon: Icon(Icons.save),
              label: Text('Create New Task'),
              onPressed: () {
                if (tasktext == ''|| subtasktext=='' ) {
                  final snackBar = SnackBar(
                    content: Text('The Task And The Subtask Should Have a Text Right ?'),
                    backgroundColor: Color(pickedcolor),
                  );

                  Scaffold.of(context).showSnackBar(snackBar);
                } else {
                  addtask();
                  Navigator.of(context).pop();
                }
              });
        },
      ),
    );
  }

 

  Widget Colorpicker(BuildContext context) {
    return SimpleDialog(
      shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.all(Radius.circular(32.0))),
      title: Text('Pick a Color For The Task'),
      children: <Widget>[
        MaterialColorPicker(
          allowShades: false,
          onMainColorChange: (color) {
            setState(() {
              pickedcolor = color.value;
              print(pickedcolor);
            });
          },
          onColorChange: (color) {
            setState(() {
              pickedcolor = color.value;
              print(pickedcolor);
            });
          },
        ),
        Padding(
          padding: EdgeInsets.all(16),
          child: OutlineButton(
            child: Text('Looks Good'),
            onPressed: () {
              Navigator.of(context).pop();
            },
          ),
        )
      ],
    );
  }
}

class Colorpickerbuilder extends StatelessWidget {
  final IconData iconData;
  final ValueChanged<IconData> action;
  final Color highlightColor;

  Colorpickerbuilder({
    @required this.iconData,
    @required this.action,
    Color highlightColor,
  }) : this.highlightColor = highlightColor;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      borderRadius: BorderRadius.circular(50.0),
      onTap: () {
        showDialog(
            context: context,
            builder: (BuildContext context) {
            return  AlertDialog(
                actions: <Widget>[
                  Padding(
                    padding: EdgeInsets.fromLTRB(0, 0, 85, 0),
                    child: OutlineButton(
                      child: Text('Looks Good'),
                      onPressed: () {
                        Navigator.of(context).pop();
                      },
                    ),
                  )
                ],
                shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.all(Radius.circular(32.0))),
                title: Text('Pick An Icon'),
                content: SingleChildScrollView(
                  child: IconPicker(
                    currentIconData: iconData,
                    onIconChanged: action,
                    highlightColor: highlightColor,
                  ),
                ),
              );
            });
      },
      child: TodoBadge(
        id: 'id',
        codePoint: iconData.codePoint,
        color: highlightColor,
        size: 30,
      ),
    );
  }
}
class EditCardpage extends StatefulWidget {
   final String tasktext;
 final int pickedcolor;
 final String subtasktext;
  final IconData icontask;
  EditCardpage(this.tasktext,this.pickedcolor,this.subtasktext,this.icontask);
  @override
  _EditCardpageState createState() => _EditCardpageState(tasktext,pickedcolor,subtasktext,icontask);
}

class _EditCardpageState extends State<EditCardpage> {
  final String tasktext;
 final int pickedcolor;
 final String subtasktext;
  final IconData icontask;
  _EditCardpageState(this.tasktext,this.pickedcolor,this.subtasktext,this.icontask);
TextEditingController task;
TextEditingController subtask;

  void addtask() {
    print(tasktext);
    final database = Provider.of<AppDatabase>(context);
    final task = Task(name: tasktext, color: pickedcolor, icon:icontask.codePoint , subtask: subtasktext);
    database.insertTask(task);
  }

  var _scaffoldKey;
  @override
  Widget build(BuildContext context) {
   
    return Scaffold(
      key: _scaffoldKey,
      backgroundColor: Colors.white,
      appBar: AppBar(
        title: Text(
          'New Task',
          style: TextStyle(color: Colors.black),
        ),
        centerTitle: true,
        elevation: 0,
        iconTheme: IconThemeData(color: Colors.black26),
        brightness: Brightness.light,
        backgroundColor: Colors.white,
      ),
      body: Container(
        constraints: BoxConstraints.expand(),
        padding: EdgeInsets.symmetric(horizontal: 36.0, vertical: 36.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              height: 16.0,
            ),
            TextField(
             controller: task,
              onChanged: (String text) {
                setState(() {
                  final tasktext = text;
                });
                print(tasktext);
              },
              onSubmitted: (String text) {
                setState(() {
                 final tasktext = text;
                });
                print(tasktext);
              },
              cursorColor: Color(pickedcolor),
              autofocus: true,
              decoration: InputDecoration(
                  border: InputBorder.none,
                  hintText: tasktext,
                  hintStyle: TextStyle(
                    color: Colors.black26,
                  )),
              style: TextStyle(
                  color: Colors.black54,
                  fontWeight: FontWeight.w500,
                  fontSize: 36.0),
            ),
            TextField(
              controller: subtask,
              onChanged: (String text) {
                setState(() {
                final  subtasktext = text;
                });
                print(subtasktext);
              },
              onSubmitted: (String text) {
                setState(() {
                final  subtasktext = text;
                });
                print(subtasktext);
              },
              cursorColor: Color(pickedcolor),
              autofocus: true,
              decoration: InputDecoration(
                  border: InputBorder.none,
                  hintText: subtasktext,
                  hintStyle: TextStyle(
                    color: Colors.black26,
                  )),
              style: TextStyle(
                  color: Colors.black54,
                  fontWeight: FontWeight.w500,
                  fontSize: 26.0),
            ),
            Container(
              height: 26.0,
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                IconButton(
                  icon: Icon(Icons.color_lens),
                  iconSize: 40,
                  color: Color(pickedcolor),
                  onPressed: () {
                    showDialog(
                        context: context, builder: (_) => Colorpicker(context));
                  },
                ),
                Colorpickerbuilder(
                    highlightColor: Color(pickedcolor),
                    iconData: icontask,
                    action: (newIcon) {
                      setState(() {
                       final icontask = newIcon; 
                      });
                    }
                )
              ],
            ),
          ],
        ),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerFloat,
      floatingActionButton: Builder(
        builder: (BuildContext context) {
          return FloatingActionButton.extended(
              backgroundColor: Color(pickedcolor),
              icon: Icon(Icons.save),
              label: Text('Create New Task'),
              onPressed: () {
                if (tasktext == ''|| subtasktext=='' ) {
                  final snackBar = SnackBar(
                    content: Text('The Task And The Subtask Should Have a Text Right ?'),
                    backgroundColor: Color(pickedcolor),
                  );

                  Scaffold.of(context).showSnackBar(snackBar);
                } else {
                  addtask();
                  Navigator.of(context).pop();
                }
              });
        },
      ),
    );
  }

 

  Widget Colorpicker(BuildContext context) {
    return SimpleDialog(
      shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.all(Radius.circular(32.0))),
      title: Text('Pick a Color For The Task'),
      children: <Widget>[
        MaterialColorPicker(
          allowShades: false,
          onMainColorChange: (color) {
            setState(() {
             final pickedcolor = color.value;
              print(pickedcolor);
            });
          },
          onColorChange: (color) {
            setState(() {
              final  pickedcolor = color.value;
              print(pickedcolor);
            });
          },
        ),
        Padding(
          padding: EdgeInsets.all(16),
          child: OutlineButton(
            child: Text('Looks Good'),
            onPressed: () {
              Navigator.of(context).pop();
            },
          ),
        )
      ],
    );
  }
}
