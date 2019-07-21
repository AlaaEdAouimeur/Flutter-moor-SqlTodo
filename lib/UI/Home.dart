import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/material.dart' as prefix0;
import 'package:provider/provider.dart';
import 'package:moo/Moor_Database/Moor_Database.dart';
import 'Todo_badge.dart';
import 'page_addlist.dart';

class HomePage extends StatefulWidget {
  @override
  _HomePageState createState() => _HomePageState();
}

TextEditingController controller;

class _HomePageState extends State<HomePage> {
  void showaddlistpage(BuildContext context) {
    Navigator.of(context).push(MaterialPageRoute(builder: (ctx) {
      return AddCardScreen();
    }));
  }

  final GlobalKey<ScaffoldState> _scaffoldKey = new GlobalKey<ScaffoldState>();
  List<String> month = [
    'NULL',
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  DateTime now = new DateTime.now();
  Widget header() {
    return Align(
      child: ListTile(
          leading: Text(
            now.day.toString(),
            style: TextStyle(fontSize: 50, color: Colors.white),
          ),
          title: Text(
            month[now.month],
            style: TextStyle(color: Colors.white, fontSize: 34),
          ),
          subtitle: Text(
            now.year.toString(),
            style: TextStyle(fontSize: 24, color: Colors.white),
          )),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      key: _scaffoldKey,
      body: Container(
        child: Stack(
          alignment: Alignment.center,
          children: <Widget>[
            Positioned(
              top: 0,
              child: Container(
                child: header(),
                width: MediaQuery.of(context).size.width,
                height: MediaQuery.of(context).size.height / 3,
                decoration: BoxDecoration(
                    color: Colors.deepOrange,
                    gradient: LinearGradient(
                        colors: [Color(0xFF2193b0), Color(0xFF6dd5ed)],
                        begin: Alignment.centerRight,
                        end: Alignment(-1, -1))),
              ),
            ),

            Positioned(
              top: 160,
              left: 25,
              child: Container(
                // color: Colors.white,
                width: 300,
                height: MediaQuery.of(context).size.height / 1,
                child: _buildTaskList(context),
              ),
            ),
            Positioned(
              top: 90,
              right: 10,
              child: IconButton(
                color: Colors.white,
                iconSize: 60,
                icon: Icon(Icons.add_circle_outline),
                onPressed: () {
                  Navigator.push(
                      context,
                      CupertinoPageRoute(
                          builder: (context) => AddCardScreen()));
                },
              ),
            )
            //  _buildTaskList(context),
          ],
        ),
      ),
    );
  }

  StreamBuilder<List<Task>> _buildTaskList(BuildContext context) {
    final database = Provider.of<AppDatabase>(context);

    return StreamBuilder(
      stream: database.watchAllTasks(),
      builder: (context, AsyncSnapshot<List<Task>> snapshot) {
        final tasks = snapshot.data ?? List();

        return ListView.builder(
          itemCount: tasks.length,
          itemBuilder: (_, index) {
            final itemTask = tasks[index];
            return _buildListItem(itemTask, database);
          },
        );
      },
    );
  }

  _buildListItem(Task itemTask, AppDatabase database) {
    print(itemTask.icon);
    return Dismissible(
      key: Key(itemTask.id.toString()),
      onDismissed: (DismissDirection direction) {
      if(direction == DismissDirection.startToEnd){
          database.deleteTask(itemTask);
      }
      else if  (direction == DismissDirection.endToStart) {
        Navigator.push(
                      context,
                      CupertinoPageRoute(
                          builder: (context) => EditCardpage(itemTask.name,itemTask.color,itemTask.subtask,IconData(itemTask.icon,))));};
                          database.deleteTask(itemTask);
      },
      child: Padding(
        padding: EdgeInsets.all(8),
        child: Container(
          height: 80,
          child: Material(
            color: Colors.white,
            elevation: 14,
            shadowColor: Colors.black38,
            child: Container(
              child: Row(
                children: <Widget>[
                 
                  Container(
                    height: 80,
                    width: 10,
                    color: prefix0.Color(itemTask.color),
                  ),
                  Expanded(
                    child: Padding(
                        padding: EdgeInsets.all(8),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.start,
                          children: <Widget>[
                            Align(
                                alignment: Alignment.topLeft,
                                child: Container(
                                  child: Text(
                                    itemTask.name,
                                    style: TextStyle(
                                        fontSize: 24, color: Colors.black),
                                  ),
                                )),
                            Align(
                              alignment: Alignment.topLeft,
                              child: Container(
                                child: Text(
                                  itemTask.subtask,
                                  style: TextStyle(
                                      fontSize: 18, color: Colors.black),
                                ),
                              ),
                            )
                          ],
                        )),
                  ),
                  Align(
                    alignment: Alignment.centerRight,
                    child: Padding(
                      padding: EdgeInsets.all(8),
                      child: Container(
                        child: Text(
                          'Data',
                          style: TextStyle(fontSize: 10, color: Colors.white),
                        ),
                      ),
                    ),
                  ),
                   Padding(
                     padding: const EdgeInsets.all(8.0),
                     child: Icon(
                       IconData(itemTask.icon, fontFamily: 'MaterialIcons',),
                       color : Color(itemTask.color)                                                                                      
                     ),
                   )
                ],
              ),
            ),
          ),
        ),
      ),
      background: Container(
        height: MediaQuery.of(context).size.height,
        color: Color(itemTask.color),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: <Widget>[
            Align(
              alignment: Alignment.centerLeft,
              child: IconButton(
                icon: Icon(Icons.delete),
                color: Colors.white,
                onPressed: () {},
              ),
            ),
            Align(
              alignment: Alignment.centerRight,
              child: IconButton(
                icon: Icon(Icons.edit),
                color: Colors.white,
                onPressed: () {},
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class ScaleRoute extends PageRouteBuilder {
  final Widget page;
  ScaleRoute({this.page})
      : super(
          pageBuilder: (
            BuildContext context,
            Animation<double> animation,
            Animation<double> secondaryAnimation,
          ) =>
              page,
          transitionsBuilder: (
            BuildContext context,
            Animation<double> animation,
            Animation<double> secondaryAnimation,
            Widget child,
          ) =>
              ScaleTransition(
                scale: Tween<double>(
                  begin: 0.0,
                  end: 1.0,
                ).animate(
                  CurvedAnimation(
                    parent: animation,
                    curve: Curves.fastOutSlowIn,
                  ),
                ),
                child: child,
              ),
        );
}
