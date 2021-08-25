import "./AboutProject.css";

function AbouProject() {
  return (
    <section className="project">
      <div className="project__wrapper">
        <h2 className="project__title">О проекте</h2>
        <div className="project__gist">
          <div>
            <p className="project__gist-subtitle">
              Дипломный проект включал 5 этапов
            </p>
            <p className="project__gist-description">
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </div>
          <div>
            <p className="project__gist-subtitle">
              На выполнение диплома ушло 5 недель
            </p>
            <p className="project__gist-description">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </div>
        </div>
        <div className="project__graph">
          <div className="project__graph-item project__graph-item_green">
            1 неделя
          </div>
          <div className="project__graph-item project__graph-item_gray">
            4 недели
          </div>
          <div className="project__graph-item project__graph-item_caption">
            Back-end
          </div>
          <div className="project__graph-item project__graph-item_caption">
            Front-end
          </div>
        </div>
      </div>
    </section>
  );
}

export default AbouProject;
